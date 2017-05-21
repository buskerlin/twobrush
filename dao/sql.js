module.exports = {
//	queryById: "select a.*,b.remark,b.pid from products a,remarks b where a.id=pid and a.id=?",
	queryById: "select * from (select a.*,b.remark,b.pid from products a left join remarks b on(a.id=b.pid and a.id=?)) c where c.id=?",
	queryPart: "select id,`desc`,pv,cover from products",
	addThumb: "update products set thumbs=thumbs+1 where id=?",
	queryThumb: "select thumbs from products where id=?",
	leaveMessage: "insert into remarks(remark,pid) values(?,?)",
	queryMessage: "select * from remarks where pid=?",
	queryToken: "select time as updatetime from weixin where type=?",
	updateToken: "update weixin set value=?,time=? where type=?"
}
