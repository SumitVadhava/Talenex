export default async function getStreamClient() {
    const STEAM_API_KEY = import.meta.env.STEAM_API_KEY

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGFyay1idXNoLTgiLCJleHAiOjE3NzE0ODgwMjh9.YckALrnacE8AINKXhqMoWnekBTQH36TVxGQhB8ghJl4";
    const client = StreamChat.getInstance(STEAM_API_KEY);
    await client.connectUser(
        {
            id: "dark-bush-8",
            name: "dark",
            image: "https://bit.ly/2u9Vc0r",
        },
        token,
    );
    return client;
}