module("Model.Relationship");

test("class-level", function() {
        var Post = Model("post");
        var Comment = Model("comment");

        Post.hasMany(Comment);
        var p = new Post({id: 1});
        ok("comment" in p); // test #1
        // has many
        equals(typeof p["comment"], "function"); // test #2
        equals(p.comment().length, 0); // test #3

        Comment.belongsTo(Post);
        var c = new Comment({id: 1});
        ok("post" in c); // test #4
        // belongs to
        equals(typeof c["post"], "function"); // test #5
        equals(c.post(), null); // test #6

        //c.post(p);
        //equals(c.post(), p); // test #7

    });
