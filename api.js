var express = require('express');
var app = express();
const ig = require('instagram-node').instagram();

//location of our static files(css,js,etc..)
app.use(express.static(__dirname + '/public'));

//set the view engine to use ejs
app.set('view engine', 'ejs');

ig.use({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
});

//the redirect uri we set when registering our application
var redirectUri = 'http://localhost:8080/handleAuth';

app.get('/authorize', function(req, res){
    // set the scope of our application to be able to access likes and public content
    res.redirect(ig.get_authorization_url(redirectUri, {  scope: ['basic', 'public_content', 'likes', 'follower_list', 'relationships']}) );
});

app.get('/handleAuth', function(req, res){
    //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
    ig.authorize_user(req.query.code, redirectUri, function(err, result){
        if(err) res.send(err);
    // store this access_token in a global variable called accessToken
        accessToken = result.access_token;
        ig.use({
	     	access_token : accessToken
	    });
        console.log('Yay! Access token is ' + result.access_token);
    // After getting the access_token redirect to the '/' route 
        res.redirect('/');
    });
})

app.get('/', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    // ig.use({
    //  access_token : accessToken
    // });

    ig.user(accessToken.split('.')[0],function(err,result,remaining,limit){
    	user = result;
    });

    ig.user_media_recent(accessToken.split('.')[0], function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
     // pass the json file gotten to our ejs template
     	// console.log(result[6]);
        res.render('pages/index', { instagram : result,user });
    });
});

app.get('/sort-descending', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user_media_recent(accessToken.split('.')[0], function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
     // pass the json file gotten to our ejs template		
		result.sort(function(a, b){return b.likes.count-a.likes.count});		
		res.render('pages/index', { instagram : result });
    });
});

app.get('/sort-ascending', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user_media_recent(accessToken.split('.')[0], function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
     // pass the json file gotten to our ejs template		
		result.sort(function(a, b){return a.likes.count-b.likes.count});		
		res.render('pages/index', { instagram : result });
    });
});

app.get('/sort-descending-comment', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user_media_recent(accessToken.split('.')[0], function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
     // pass the json file gotten to our ejs template       
        result.sort(function(a, b){return b.comments.count-a.comments.count});        
        res.render('pages/index', { instagram : result });
    });
});

app.get('/sort-ascending-comment', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user_media_recent(accessToken.split('.')[0], function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
     // pass the json file gotten to our ejs template       
        result.sort(function(a, b){return a.comments.count-b.comments.count});        
        res.render('pages/index', { instagram : result });
    });
});

 
app.get('/video', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user_media_recent(accessToken.split('.')[0], function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
     // pass the json file gotten to our ejs template		
		var akhir = [];
		result.forEach(function(item){
			if(item.type=='video') {
					akhir.push(item);
			}				
		});
		res.render('pages/index', { instagram : akhir });
		});		
    });

// MASIH DALAM PENGEMBANGAN
app.get('/comment', function(req, res){
    // create a new instance of the use method which contains the access token gotten
    ig.use({
        access_token : accessToken
    });
     
    ig.comments('1307305534747174734_1397159454',function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
    
        console.log("AAAA");
        console.log(result);		
        console.log(result[0]);		
        // pass the json file gotten to our ejs template
        //res.render('pages/index', { instagram : result });
    });
});

app.listen(8080,() => {
  console.log(`Server running at https://localhost:8080/`);
});



//tambahan
//ditutup
    //ig.user_followers(accessToken.split('.')[0], function(err, users, pagination,
	//ig.user_follows(accessToken.split('.')[0], function(err, users, pagination,	remaining
	//ig.user_self_liked(function(err, result, pagination, remaining, limit) {
    //ig.media_popular(function(err, result, remaining, limit) {      
	//ig.likes('1939990198478018868_3606905250', function(err, result, remaining, limit) {
	//ig.user_search('hilman19', function(err, users, remaining, limit) {
	
	
app.get('/nilai', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.media_popular(function(err, result, remaining, limit) {      
        if(err) res.json(err);
     // pass the json file gotten to our ejs template				
		console.log(result);		
		//res.render('pages/index', { instagram :result });
	});		
});

var opt = {
	min_timestamp : '1546275600',
	max_timestamp : '1547642566',
	count : '3'
};
app.get('/haha', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user_media_recent(accessToken.split('.')[0], opt,function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
		console.log(result[1]);
     // pass the json file gotten to our ejs template
        res.render('pages/index', { instagram : result });
    });
});


app.get('/hahad', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });

    ig.user('3606905205', function(err, result, remaining, limit) {
        if(err) res.json(err);
		console.log(result);
		console.log(result.counts.follows);
     // pass the json file gotten to our ejs template
        //res.render('pages/index', { instagram : result });
    });
});
app.get('/haham', function(req, res){
   // create a new instance of the use method which contains the access token gotten
    ig.use({
     access_token : accessToken
    });
	ig.user_search('hilman19', function(err, users, remaining, limit) {
    //ig.user_self_feed(function(err, result, pagination, remaining, limit) {
        if(err) res.json(err);
		console.log(result);
		//console.log(result.counts.follows);
     // pass the json file gotten to our ejs template
        //res.render('pages/index', { instagram : result });
    });
});


