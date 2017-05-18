var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/incoming', secret: 'brushUpdate'})
// 上面的 secret 保持和 GitHub 后台设置的一致

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',event.payload.repository.name,event.payload.ref);
  var PATH = "/home/twobrush";
  var commands = ['cd ' + PATH,'git pull'].join(' && ');
    require('child_process').exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        throw err
      }
      process.stderr.write(err);
      process.stdout.write(out);

    })
//run_cmd('sh', ['./startPull.sh'], function(text){ 
//	console.log("callback success");
//	console.log(text); 
//});
})