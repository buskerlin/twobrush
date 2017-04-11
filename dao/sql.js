module.exports = {
	queryById: "select * from products where id=?",
	queryPart: "select id,`desc`,pv,src from products",
	addThumb: "update products set thumbs=thumbs+1 where id=?",
	queryThumb: "select thumbs from products where id=?"
}
