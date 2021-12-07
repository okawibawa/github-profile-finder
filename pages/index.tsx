import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';

// apis
import { fetchGithubProfile } from './api/apis';
import axios from 'axios';

// interfaces
interface Username {
  name: string;
}

// components
import ResultSection from '../components/ResultSection';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [username, setUsername] = useState<Username>();
  const [profile, setProfile] = useState([]);
  const [repos, setRepos] = useState([]);

  const handleInputUsername = async (event: any) => {
    setUsername(event.target.value);
  };

  const handleKeyInput = (e: any) => {
    e.key === 'Enter' && fetchProfile();
  };

  const fetchProfile = async () => {
    if (!username) {
      alert('Please input a username first!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);

      setProfile(res.data);

      try {
        const resRepos = await axios.get(res.data.repos_url);

        setRepos(resRepos.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>GitHub Profile Finder</title>
          <meta name="description" content="A GitHub Profile Finder Web App" />
          <link rel="icon" href="/logo.svg" />
        </Head>

        <main className={styles.main}>
          <Image src="/logo.svg" height="44" width="41" alt="logo" />
          <h1 className={styles.main__title}>GitHub Profile Finder</h1>

          <div className={styles.main__search_container}>
            <input
              className={styles.main__search_bar}
              type="text"
              placeholder="Enter a username..."
              onChange={handleInputUsername}
              onKeyDown={handleKeyInput}
            />
            {!isLoading && (
              <button className={styles.main__search_button} onClick={fetchProfile}>
                Search
              </button>
            )}

            {isLoading && (
              <button className={styles.main__search_button}>
                <ClipLoader color="white" loading={isLoading} size={20} />
              </button>
            )}
          </div>

          {isLoading === false && <ResultSection data={profile} repos={repos} />}
        </main>

        <footer>
          <small
            style={{
              color: 'white',
              marginTop: 'auto',
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Made with 💛 by Oka Wibawa.
          </small>
        </footer>
      </div>
    </>
  );
};

export default Home;
