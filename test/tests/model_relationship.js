module("Model.Relationship");

test("class-level", function() {
        var Post = Model("post");
        var Comment = Model("comment");

        Post.hasMany(Comment);
        var p = new Post({id: 111, title: "Woohoo!"});
        ok("comment" in p); // test #1
        // has many
        equals(typeof p["comment"], "function"); // test #2
        equals(p.comment().length, 0); // test #3

        Comment.belongsTo(Post);
        var c = new Comment({id: 222, body: "lame"});
        ok("post" in c); // test #4
        // belongs to
        equals(typeof c["post"], "function"); // test #5
        equals(c.post(), null); // test #6

        c.attr("post_id", 111);
        Comment.collection = [c];
        equals(p.comment().length, 1); // test #7
        equals(p.comment()[0].attributes, c.attributes); // test #8

        Post.collection = [p];
        equals(c.post().attributes, p.attributes); // test #9


        Post.hasMany(Comment, "responses");
        equals(p.responses().length, 1); // test #10
        equals(p.responses()[0].attributes, c.attributes); // test #11

        Comment.belongsTo(Post, "article");
        equals(c.article().attributes, p.attributes); // test #12
    });
