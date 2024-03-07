{
    function extent(nums: number[]) {
        let min, max;
        for (const num of nums) {
            if (!min) {
                min = num;
                max = num;
            } else {
                min = Math.min(min, num);
                max = Math.max(max, num);
            }
        }
        return [min, max];
    }

    const [min, max] = extent([0, 1, 2]);
    const span = max - min;
}
{
    function extent(nums: number[]) {
        let result: [number, number] | null = null;
        for (const num of nums) {
            if (!result) {
                result = [num, num];
            } else {
                result = [Math.min(num, result[0]), Math.max(num, result[1])];
            }
        }
        return result;
    }

    const [min, max] = extent([0, 1, 2])!;
    const span = max - min;

    const range = extent([0, 1, 2]);
    if (range) {
        const [min, max] = extent([0, 1, 2])!;
        const span = max - min;
    }
}
{
    interface UserInfo {
        name: string;
    }
    interface Post {
        post: string;
    }
    declare function fetchUser(userId: string): Promise<UserInfo>;
    declare function fetchPostsForUser(userId: string): Promise<Post[]>;

    class UserPosts {
        user: UserInfo | null;
        posts: Post[] | null;

        constructor() {
            this.user = null;
            this.posts = null;
        }

        async init(userId: string) {
            return Promise.all([
                async () => (this.user = await fetchUser(userId)),
                async () => (this.posts = await fetchPostsForUser(userId)),
            ]);
        }

        getUserName() {
            // ...?
        }
    }
}
{
    interface UserInfo {
        name: string;
    }
    interface Post {
        post: string;
    }
    declare function fetchUser(userId: string): Promise<UserInfo>;
    declare function fetchPostsForUser(userId: string): Promise<Post[]>;
    class UserPosts {
        user: UserInfo;
        posts: Post[];

        constructor(user: UserInfo, posts: Post[]) {
            this.user = user;
            this.posts = posts;
        }

        static async init(userId: string): Promise<UserPosts> {
            const [user, posts] = await Promise.all([
                fetchUser(userId),
                fetchPostsForUser(userId),
            ]);
            return new UserPosts(user, posts);
        }

        getUserName() {
            return this.user.name;
        }
    }
}
