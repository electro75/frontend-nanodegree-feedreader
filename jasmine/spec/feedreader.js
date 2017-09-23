/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. This
 * ensures they don't run until the DOM is ready.
 */

$(function() {
    /* First test suite - a test suite just contains
    *  a related set of tests. This suite is all about the RSS
    *  feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* First test -to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs that are not empty', function(){
            for(const feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names that are not empty', function(){
            for(const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /*New test suite:"The menu" */
    describe('The Menu', function(){
        var menu=$('body');
        var icon=$('.menu-icon-link');

        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden', function(){
            expect(menu.hasClass("menu-hidden")).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('toggles on click', function(){
            icon.trigger('click');
            expect(menu.hasClass("menu-hidden")).toBe(false); //two expectations: one for each click
            icon.trigger('click');
            expect(menu.hasClass("menu-hidden")).toBe(true);
        });
    });
         

    /*New test suite: "Initial Entries" */
    describe('Initial Entries', function(){

        /*A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){ //since loadFeed() is asynchronous
            loadFeed(0,done);
        });

        it('are not empty',function(done){
            expect($('.feed .entry').length).not.toBe(0);
            done();

        });
    });

    /*New test suite: "New Feed Selection" */
    describe('New Feed Selection',function(){
        var newFeed;
        var prevFeed;

         /*A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done){  //since loadFeed() is asynchronous
            loadFeed(0,function(){
                prevFeed=$('.feed').html();
                loadFeed(1,function(){
                    newFeed=$('.feed').html();
                    done();
                 });
            });

        });

        it('shows different feeds',function(done){
            expect(newFeed!=prevFeed).toBe(true); //checks for the two feeds to be different.
            done();
        });
    });
});
