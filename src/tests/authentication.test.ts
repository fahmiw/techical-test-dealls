import { faker } from "@faker-js/faker"
import * as UserRepository from "../db/users";

describe("login", () => {
    test("should checks authentication", async () => {
        const req = "fahmiwidianto1@gmail.com",
        res = {
            authentication: {
              password: '76890985bd9d5b3991b4531709e37d71f7fef1521f45fa88c31e8bba44f02431',
              salt: 'f/x+dC1BYZatcwBULlPsYJoKFwPc7I1EHJgWwq2kkJVv3J+C/LB8Z4ras3zxP+5+c7hjMw/dX0ZbjsoWO1W8Z+PmsghhYaIh7nn+/vCZKcwLacJLI1pV9hX1qzbn1JUnXMocYavVyVLyZNarW9G+Q/bDP787oYEWIN4Ll//e9kA='
            },
            is_subcribe: false,
            _id: "64847e2303c8da940ee3f890",
            fullname: 'Fahmi Widianto',
            email: 'fahmiwidianto1@gmail.com',
            telphone: 83123321445,
            photo: 'profile-111529181.jpg',
            birthday: "2023-06-09T11:10:24.845Z",
            gender: false,
            __v: 0
        };
        const user = UserRepository.getUserByEmail(req);
        expect(res).toBe(user);
    });
});