var express = require('express');
var router = express.Router();
const bbburl = "https://bbb.yourdomain.com/";

router.get('/', function (req, res) {

    var result = null;
    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(__dirname, '');
    //const contentfolder = directoryPath+"/../var/bigbluebutton/learning-dashboard/";
    const contentfolder = "/var/bigbluebutton/learning-dashboard/";
    try{
        fs.readdir(contentfolder, function (err, files) {
            //handling error
            if (err) {
                result = err;
            } 
            
            var folderList = [];
            if(files.length > 0){
            files.reverse().forEach(item => {
                var fileStats = fs.statSync(contentfolder + item);
                var fol = {
                    name: item,
                    date: fileStats.ctime
                };
                if(item.length > 20){
                    folderList.push(fol);
                }
            });
            let sortedFolderList = folderList.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
            
            res.render("index",{sonuc : sortedFolderList});
        }else{
            res.write("<h1>There is no content in the folder</h1>");
        }
        });
    }catch(err){
        res.write(err);    
    }
    


});

router.get('/:id', function (req, res) {

    var result = null;
    const path = require('path');
    const fs = require('fs');
    const directoryPath = path.join(__dirname, '');
    var id = req.params.id;
    //const contentfolder = "d:\\node projects\\bbbld\\app/var/bigbluebutton/learning-dashboard/"+id+"/";
    const contentfolder = "/var/bigbluebutton/learning-dashboard/"+id+"/";
    try{
        fs.readdir(contentfolder, function (err, files) {
            //handling error
            if (err) {
                res.render("error",{message : err,error : {status : 500,stack : err}});    
            } 
            if(files != undefined && files.length>0){
                const folder = files[0];
                let folderurl = contentfolder+folder+'/learning_dashboard_data.json';
                let rawdata = fs.readFileSync(folderurl);
                
                result = JSON.parse(rawdata);
                // let userList = [];
                // if(result.users != undefined){
                //     for(var useritem in result.users){
                //         var user = result.users[useritem];
                //         let addUserItem = {
                //             intId : user.intId,
                //             extId : user.extId,
                //             name : user.name,
                //             isModerator : user.isModerator,
                //             isDialIn : user.isDialIn,
                //             answers : user.answers,
                //             talk : user.talk,
                //             emojis : user.emojis,
                //             webcams : user.webcams,
                //             totalOfMessages : user.totalOfMessages,
                //             registeredOn : user.registeredOn,
                //             leftOn : user.leftOn
                //         };
                //         userList.push(addUserItem);
                //     }
                // }
                result.users = Object.values(result.users);
                res.json(result);

            } 
        });
    }catch(err){
        res.write(err);    
    }
    


});
router.get('/json/:id', function (req, res) {

        var result = null;
        const path = require('path');
        const fs = require('fs');
        const directoryPath = path.join(__dirname, '');
        var id = req.params.id;
        //const contentfolder = "d:\\node projects\\bbbld\\app/var/bigbluebutton/learning-dashboard/"+id+"/";
        const contentfolder = "/var/bigbluebutton/learning-dashboard/"+id+"/";
        try{
            fs.readdir(contentfolder, function (err, files) {
                //handling error
                if (err) {
                    res.render("error",{message : err,error : {status : 500,stack : err}});    
                } 
                if(files != undefined && files.length>0){
                    const folder = files[0];
                    let folderurl = contentfolder+folder+'/learning_dashboard_data.json';
                    let rawdata = fs.readFileSync(folderurl);
                    
                    result = JSON.parse(rawdata);
                    let accesstoken = result.learningDashboardAccessToken;
                    res.redirect(bbburl+"learning-dashboard/"+id+"/"+accesstoken+"/learning_dashboard_data.json");
                } 
            });
        }catch(err){
            res.write(err);    
        }
        

    
});

router.get('/lb/:id', function (req, res) {

        var result = null;
        const path = require('path');
        const fs = require('fs');
        const directoryPath = path.join(__dirname, '');
        var id = req.params.id;
        //const contentfolder = "d:\\node projects\\bbbld\\app/var/bigbluebutton/learning-dashboard/"+id+"/";
        const contentfolder = "/var/bigbluebutton/learning-dashboard/"+id+"/";
        try{
            fs.readdir(contentfolder, function (err, files) {
                //handling error
                if (err) {
                    res.render("error",{message : err,error : {status : 500,stack : err}});    
                } 
                if(files != undefined && files.length>0){
                    const folder = files[0];
                    let folderurl = contentfolder+folder+'/learning_dashboard_data.json';
                    let rawdata = fs.readFileSync(folderurl);
                    
                    result = JSON.parse(rawdata);
                    let accesstoken = result.learningDashboardAccessToken;
                    res.redirect(bbburl+"learning-dashboard/?meeting="+id+"&report="+accesstoken);
                } 
            });
        }catch(err){
            res.write(err);    
        }
        

    
});


module.exports = router;
