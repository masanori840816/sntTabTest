describe("javascript.js", function() {
  var fileModel;
  var viewArrowLeft, viewArrowRight;
  var tabView;
  beforeEach(function () {
    loadFixtures('viewTest.html');
    fileModel = new FileModel();
    tabView = new TabView();
    viewArrowLeft = document.getElementById('arrow_button_left');
    viewArrowRight = document.getElementById('arrow_button_right');
  });
  it('Get default HTML templates by TabNum & ContentNum', function () {
    spyOn($, 'ajax');
    getHtml(0, 0);
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('/html/0.html');
  });
  it('Get model default datas', function () {
    expect(fileModel.get('page')).toBe(0);
    expect(fileModel.get('content')).toBe(0);
    expect(fileModel.get('file')).toBe('');
  });
  it('Get ContentFileCollection', function () {
    expect(ContentFileCollection.length).toBeGreaterThan(0);
    var fileName = ContentFileCollection.findWhere({page: 0, content: 0}).get('file');
    expect(fileName).toEqual('0.html');
  });
  it('Clicking arrow buttons', function () {
    // intRightTabNumのデフォルト値を確認する.
    expect(intRightTabNum).toEqual(2);
    viewArrowLeft.click();
    expect(intRightTabNum).toEqual(1);
    expect(viewArrowLeft.disabled).toEqual(true);

    viewArrowRight.click();
    expect(intRightTabNum).toEqual(2);
    expect(viewArrowRight.disabled).toEqual(false);

    viewArrowRight.click();
    expect(viewArrowLeft.disabled).toEqual(false);
    viewArrowRight.click();
    expect(intRightTabNum).toEqual(4);
    expect(viewArrowRight.disabled).toEqual(true);
  });
  it('Check if clicked events fire', function () {
    spyOn(tabView, 'moveTab');
    // Viewにイベントを関連付け.
    tabView.delegateEvents();
    viewArrowLeft.click();
    expect(tabView.moveTab).toHaveBeenCalled();
  });
});
