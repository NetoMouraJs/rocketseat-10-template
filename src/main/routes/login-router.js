module.exports = router => {
	router.get('/test',(req,res)=>{
		res.json({'msg':'route-login'})
	})
}