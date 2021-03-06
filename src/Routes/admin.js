import admin from '../Controller/admin_controller';
import auth from '../Module/auth';
import multer from 'multer';
import md5 from 'md5';
import express from 'express'
import path from 'path';

exports.getRouter = (app) => {

	let storage = multer.diskStorage({
	destination : function(req,file,callback){
		console.log(file)
        callback(null,'./src/Uploads/Admin');
	},
	filename : function(req,file,callback){
		let fileUniqueName = md5(Date.now());
        callback(null,fileUniqueName+ path.extname(file.originalname));
    }
});
	let upload = multer({storage:storage});

	app.route("/admin/adminSignUp").post(admin.adminSignUp);

	app.route("/admin/admin_login").post(admin.admin_login);

	app.route("/admin/admin_forget_password").post(admin.admin_forget_password);

	app.route("/admin/verifyOtp").post(auth.adminLogin, admin.verifyOtp);

	app.route("/admin/changePassword").put(auth.adminLogin, admin.changePassword);

	app.route("/admin/changePassword").put(auth.adminLogin, admin.changePassword);

	app.route("/admin/updateProfileImage").post(auth.adminLogin, upload.any(), admin.updateProfileImage);

	app.route("/admin/get_user_details").get(admin.get_user_details);

	app.route("/admin/blockUser").put(admin.blockUser);

	app.route("/admin/blockDriver").put(admin.blockDriver);
}