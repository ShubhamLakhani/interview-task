const mobileSwaggerJSDocs = require('swagger-jsdoc')

const swaggerOption = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Name',
      description: 'Project Description',
      contact: {
        name: 'Project Name',
      },
      servers: ['http://localhost:8080'],
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'access-token',
          description: `<h4>Use this tokens for different user:</h4><b>Admin:</b> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoxfQ.100KcOwvID8h65m8w5H3a2DxTCr6X71r4UNU5X7ykEc
          <br/><b>Normal:</b> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5vcm1hbCIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6Mn0.GoT6c579H9u7mKeoJb8_KhAn3idkYs-0Q2SkPbhIrc8
          <br/><b>Limited:</b> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxpbWl0ZWQiLCJpYXQiOjE1MTYyMzkwMjIsInJvbGUiOjN9.liyKK1aC9-wvhb6Zc7gABMgkWvuc6g0iFfn__O-3NZY`
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

const swaggerDocs = mobileSwaggerJSDocs(swaggerOption)

module.exports = swaggerDocs
