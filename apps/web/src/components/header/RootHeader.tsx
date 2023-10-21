import { GitHubIcon } from "@/src/components/icons/Github";
import { NextIcon } from "@/src/components/icons/Next";
import { DiscordIcon } from "@/src/components/icons/Discord";
import Wallet from "@/src/components/wallet/Wallet";

const RootHeader = () => {
  return (
    <header className="border-b border-neutral-700">
      <div className="container max-w-7xl flex mx-auto px-4 py-6 justify-between items-center">
        <h1 aria-hidden="true" className="sr-only">
          Thread powered by Member Protocol
        </h1>

        <a
          href="/"
          className="hover:opacity-75 text-white hover:no-underline transition-all duration-200"
        >
          <span className="flex flex-col xs:flex-row xs:space-x-2  xs:items-center">
            <NextIcon className="w-[90px]" />
            <span className=" text-2xl font-bold tracking-tighter">
              Discord Forum
            </span>
          </span>
        </a>

        <Wallet />

        <div className="flex space-x-5">
          <a
            href="https://nextjs.org/discord"
            target="_blank"
            rel="noopener"
            aria-label="Discord Server Invite"
            className="hover:opacity-75 text-white transition-all duration-200"
          >
            <DiscordIcon size={7} />
          </a>
          <a
            href="https://github.com/rafaelalmeidatk/nextjs-forum"
            target="_blank"
            rel="noopener"
            aria-label="Github Repository"
            className="hover:opacity-75 text-white transition-all duration-200"
          >
            <GitHubIcon size={7} />
          </a>
          W
        </div>
      </div>
    </header>
  );
};

export default RootHeader;
