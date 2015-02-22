var intTabNum = 0;
var intRightTabNum = 2;
var FileModel = Backbone.Model.extend({
	defaults: {
		page: 0,
		content: 0,
		file: ''
	}
});
var FileCollection = Backbone.Collection.extend({
	model: FileModel
});
var ContentFileCollection = new FileCollection([
		{page: 0, content: 0, file: '0.html'},
		{page: 0, content: 1, file: '1.html'},
		{page: 1, content: 0, file: '0.html'},
		{page: 1, content: 1, file: '1.html'},
		{page: 2, content: 0, file: '0.html'},
		{page: 2, content: 1, file: '1.html'},
		{page: 3, content: 0, file: '0.html'},
		{page: 3, content: 1, file: '1.html'},
		{page: 4, content: 0, file: '0.html'},
		{page: 4, content: 1, file: '1.html'}]);
var TabView = Backbone.View.extend({
	el: '#main',
	events: {
		'change .tab_radio': 'movePage',
		'click .button_arrow': 'moveTab',
		'click .btnContents': 'showContents'
	},
	moveTab: function (e){
		switch (e.target.id){
		case 'arrow_button_left':
			// 一つ左隣のTabを表示.
			intRightTabNum--;
			updateTabStyles();
			break;
		case 'arrow_button_right':
			// 一つ右隣のTabを表示.
			intRightTabNum++;
			updateTabStyles();
			break;
		}
	},
	movePage: function (e) {
		var strTargetId = '#' + e.target.id;
		var intNewPageNum = jQuery(strTargetId).data('tabNum');
		location.href='?tab=' + intNewPageNum + '&lrt=' + intRightTabNum;
	},
	showContents: function(e) {
		var strTargetId = '#' + e.target.id;
		var intContentNum = jQuery(strTargetId).data('contentNum');
		getHtml(intTabNum,intContentNum);
	}
});
(function () {
	var aryTabName = ["tab_label_0", "tab_label_1", "tab_label_2", "tab_label_3", "tab_label_4"]
	var DEFAULT_RIGHT_TAB_NUM = 2;

	var view = new TabView();

	this.loadTabs = function(intNewTabNum, intLastRightTabNum){
		// ロード時に実行. Tabの表示切り替え、矢印ボタンのEnable/Disable.
		intTabNum = intNewTabNum;
		intRightTabNum = intLastRightTabNum;
		updateTabStyles();
		// デフォルトでボタン0のコンテンツが表示されるようにする
		document.getElementById("btn_contents_0").checked = true;
		getHtml(intTabNum, 0);
	};
	this.updateTabStyles = function(){
		// 矢印ボタンのEnable/Disableを設定.
		document.getElementById('arrow_button_left').disabled = (intRightTabNum <= DEFAULT_RIGHT_TAB_NUM);
		document.getElementById('arrow_button_right').disabled = (intRightTabNum >= 4);
		// Tabの表示切り替え
		document.getElementById("tab_" + intTabNum).checked = true;
		var intTabLeftNum = intRightTabNum - 2;
		for(var i=4;i>=0;i--){
			document.getElementById(aryTabName[i]).style.display = ((i >= intTabLeftNum)&&(i <= intRightTabNum))? 'block': 'none';
		}
	};
	this.getHtml = function(intNewTabNum, intNewContentNum) {
		$.ajax({
			type: 'GET',
			url: '/html/' + ContentFileCollection.findWhere({page: intNewTabNum, content: intNewContentNum}).get('file'),
			dataType: 'html',
			success: function(data) {
				$('#contents_frame').html(data);
			},
			error:function() {
				alert('Error');
			}
		});
	};
}).call(this);
