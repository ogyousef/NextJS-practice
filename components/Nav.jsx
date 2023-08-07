"use client";

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {

const {data:session} = useSession();  
console.log(session);
const isUserLoggedIn = false;

  const [toggleDropdown, settoggleDropdown] = useState(false);

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="gap-2 flex-center">
        <Image
          className="objext-contain"
          src="/assests/images/logo.svg"
          width="30"
          height="30"
          alt='test'
        />
        <p className="logo_text">Promptoia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-3">
            <Link href="/create-prompt" className="black_btn">
              Create Post

            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              SignOut
            </button>
            <Link href="/profile">
              <Image src={ session?.user.image||"/assests/images/logo.svg"}  alt='test' width={37} height={37} />
            </Link>
          </div>
        ) : (
          <>
          
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ?  (
          <div className="flex">
            <Image
              src={ session?.user.image||"/assests/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="drowpdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="drowpdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompts
                </Link>
                <button type="button"
                className="mt-5 w-full black_btn "
                onClick={()=>{settoggleDropdown(false); signOut();}}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="black_btn"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;