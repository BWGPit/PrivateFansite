from interactions import *
from dotenv import load_dotenv
import os
import subprocess

load_dotenv()
# Environment variables
TOKEN = os.getenv("TOKEN")
# The following ENV variables are in the format: VAR_NAME="0000000, 0000000, ..., 0000000"
AUTHORISED_GUILDS=[int(x) for x in os.getenv("GUILD_IDS").split(", ")]
AUTHORISED_USERS=[int(x) for x in os.getenv("DISCORD_ADMIN_IDS").split(", ")]
if TOKEN == None:
    raise ValueError("TOKEN not found in .env")

client = Client(token=TOKEN, activity=Activity(name="알고있유", type=ActivityType.LISTENING))

# Check function for validating a user
async def auth_user(ctx: BaseContext):
    return ctx.author_id in AUTHORISED_USERS

@slash_command(
    name="execute",
    description="Execute a command (server-side)",
    scopes=AUTHORISED_GUILDS
)
@slash_option(
    name="command",
    description="Command to execute",
    opt_type=OptionType.STRING,
    required=True
)
@check(auth_user)
async def execute(ctx: SlashContext, command: str):
    await ctx.defer()
    result = subprocess.check_output(command, shell=True, text=True)
    await ctx.send(f"Command executed:\n```{result[:1900]}```")

# Requires yt-dlp installed

@slash_command(
    name="dlp",
    description="yt-dlp in Media/ folder"
)
@slash_option(
    name="args",
    description="url and args",
    opt_type=OptionType.STRING,
    required=True
)
@slash_option(
    name="cookies",
    description="Whether to have cookies (located in ./.cookies.txt)",
    opt_type=OptionType.BOOLEAN,
    required=False
)
async def dlp(ctx: SlashContext, args: str, cookies: bool = False):
    await ctx.defer()
    cmd = f"cd Media && yt-dlp {args} {'--cookies .cookies.txt' if cookies else ''} && cd .."
    result = subprocess.check_output(cmd, shell=True, text=True)
    await ctx.send(f"Command executed:\n```{result[:1900]}```")

@listen()
async def on_startup():
    print("Bot loaded")

client.start()