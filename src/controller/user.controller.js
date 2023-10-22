const db = require('../helper/db_functions');
const { DEF_LIMITED_ID } = require('../config/config');

const getDemoList = async (req, res) => {
    let reqQuery = req.query;
    try {
        let limit = 100;
        let offset = 0;
        if (reqQuery?.per_page && reqQuery?.limit) {
            limit = Number(reqQuery.per_page);
            offset = Number(reqQuery.limit) * limit;
        }

        let where = [];
        if (res.locals.decoded_role == 3) {
            where.push(`region_id in (${DEF_LIMITED_ID})`);
        }
        if (reqQuery?.id) {
            where.push(`id = ${reqQuery.id}`);
        }
        if (reqQuery?.assembly_id) {
            where.push(`assembly_id = '${reqQuery.assembly_id}'`);
        }
        if (reqQuery?.region_id) {
            where.push(`region_id = ${reqQuery.region_id}`);
        }
        if (reqQuery?.membership_status) {
            where.push(`membership_status = '${reqQuery.membership_status}'`);
        }

        let field = 'rl.id,rl.assembly_id,rl.locus_name,rl.public_locus_name,rl.chromosome,rl.strand,rl.locus_start,rl.locus_stop,rl.member_count';

        if (res.locals.decoded_role == 1) {
            field += `,(
                    select 
                        json_agg(
                            json_build_object(
                                'locus_member_id', rlm.id,
                                'region_id', rlm.region_id,
                                'locus_id', rlm.locus_id,
                                'urs_taxid', rlm.urs_taxid,
                                'membership_status', rlm.membership_status
                            )
                        )
                    from rnc_locus_members rlm 
                    where rlm.locus_id = rl.id
                ) as locus_members`;
        } else if (res.locals.decoded_role == 3) {
            field += ',rlm.region_id'
        }

        let query = `select ${field} from rnc_locus rl`;

        if (res.locals.decoded_role == 3) {
            query += ' left join rnc_locus_members rlm on rlm.locus_id = rl.id';
        }

        query = `select *${res.locals.decoded_role == 1 ? ", locus_members -> 0 ->> 'urs_taxid' as urs_taxid" : ''} from (${query}) as data ${where.length ? ` where ${where.join(" or ")}` : ''}`

        let order_by = reqQuery?.order_by && reqQuery?.order_field ? reqQuery.order_field + ' ' + reqQuery.order_by : 'id desc';

        query += ` order by ${order_by} limit ${limit} offset ${offset}`;
        const data = (await db.query(query)).rows;

        return res.status(200).json({ status: 'SUCCESS', data: { dataList: data } });
    } catch (error) {
        return res.status(400).json({ status: 'FAILD' });
    }
}

module.exports = {
    getDemoList
}