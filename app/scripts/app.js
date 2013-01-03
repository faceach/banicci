define(['jquery'
	, './widget/rotate/main'
	], function($, rotate) {

	$('.page-content section').each(function(e){
		var r = new rotate;
		r.init($(this));
	});
  return 'Hello from Yeoman!';
});