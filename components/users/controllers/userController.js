class User{
    async init(req, res){
        try{
            res.render("index", {});
        }
        catch(err){
            console.log(err);
        }
    }
}
module.exports = new User();