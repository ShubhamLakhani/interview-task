const routes = require('express').Router();
const {
    userController
} = require('../controller');

/**
 * @swagger
 * /api/get-test-list:
 *  get:
 *   tags:
 *    - [Demo List]
 *   parameters:
 *    - in: query
 *      name: id
 *      schema:
 *       type: number
 *       required: false
 *      description: Filter id.
 *    - in: query
 *      name: assembly_id
 *      schema:
 *       type: string
 *       required: false
 *      description: Filter assembly_id
 *    - in: query
 *      name: region_id
 *      schema:
 *       type: number
 *       required: false
 *      description: Filter region_id
 *    - in: query 
 *      name: membership_status
 *      schema:
 *       type: string
 *       required: false
 *      description: Filter membership_status
 *    - in: query
 *      name: limit
 *      schema:
 *       type: number
 *       required: true
 *      description: Limit
 *      example: 0
 *    - in: query
 *      name: per_page
 *      schema:
 *       type: number
 *       required: true
 *      description: Per page
 *      example: 1000
 *    - in: query
 *      name: order_field
 *      schema:
 *       type: string
 *       required: false
 *      description: Send order by field name like assembly_id, locus_name, public_locus_name etc...
 *    - in: query
 *      name: order_by
 *      schema:
 *       type: string
 *       required: false
 *      description: Send order by field value like ASC/DESC
 *      security:
 *       - ApiKeyAuth: []
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description : error
 */
routes.get('/get-test-list', userController.getDemoList);

module.exports = routes;