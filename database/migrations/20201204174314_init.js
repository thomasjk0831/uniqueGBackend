
exports.up = function (knex) {

};

exports.down = function (knex) {

};

exports.up = function (knex) {
    return (
        knex.schema
            .createTable("users", tbl => {
                tbl.increments();
                tbl.string("username", 128).notNullable().unique();
                tbl.string("password", 128).notNullable();
            })
            .createTable("orders", tbl => {
                tbl.increments();
                tbl.float("total").notNullable();
                tbl.string("items_ordered", 1024).notNullable();
                tbl.integer("user_id")
                    .unsigned()
                    .references("users.id")
                    .onDelete("RESTRICT")
                    .onUpdate("CASCADE");
            })


            .createTable("items", tbl => {
                tbl.increments();
                tbl.string("name", 128).notNullable().index()
                tbl.float("price").notNullable();
                tbl.string("imageUrl", 1024).notNullable();
                tbl.string("description", 1024).notNullable();
                tbl.string("shipping", 1024).notNullable();
            })

    )

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users")
        .dropTableIfExists("orders")
        .dropTableIfExists("items")

};
