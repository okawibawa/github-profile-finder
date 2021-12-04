import Image from 'next/image';
import styles from '../styles/ResultSection.module.css';

const ResultSection = ({ data, repos }: any) => {
  console.log(repos);

  return (
    <section className={styles.section__container}>
      <div className={styles.section__profile__container}>
        <div className={styles.section__profile__image}>
          <Image width="134" height="134" src={data.avatar_url} alt="Profiles" className={styles.profile__image} />
        </div>

        <div className={styles.section__profile__info}>
          <h2 className={styles.name}>{data.name}</h2>
          <h6 className={styles.login}>{data.login}</h6>
          <h6 className={styles.description}>{data.bio ? data.bio : '-'}</h6>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/users.svg" height="10" width="12" alt="users" />
              <small style={{ marginLeft: '6px', fontSize: '10px' }}>{data.followers} followers</small>
              <div
                style={{
                  marginLeft: '6px',
                  width: '4px',
                  height: '4px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              ></div>
              <small style={{ marginLeft: '6px', fontSize: '10px' }}>{data.following} following</small>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '1px', width: '100%', backgroundColor: '#444C56', margin: '1rem' }}></div>

      <div className={styles.section__profile__repos}>
        {repos.length > 0 ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <p style={{ fontSize: '14px', color: '#c4c4c4', fontWeight: 'bold' }}>Sort:</p>
            </div>

            <div className={styles.repos__container}>
              {repos.map((repo: any) => (
                <div
                  style={{
                    backgroundColor: '#3D464A',
                    border: '1px solid #444C56',
                    borderRadius: '6px',
                    textAlign: 'left',
                    padding: '16px',
                    position: 'relative',
                    height: '160px',
                    width: '100%',
                  }}
                  key={repo.id}
                >
                  <h6 style={{ fontSize: '16px', color: '#539BF5', marginBottom: '4px' }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h6>
                  <p style={{ fontSize: '14px', color: '#C4C4C4', fontWeight: 'bold' }} className={styles.repo__desc}>
                    {repo.description ? repo.description : '-'}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 16, bottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Image src="/star.svg" height="16" width="16" alt="star" />
                      <p style={{ color: '#c4c4c4', fontSize: '12px', marginLeft: '4px' }}>{repo.stargazers_count}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '12px' }}>
                      <Image src="/git-branch.svg" height="16" width="16" alt="star" />
                      <p style={{ color: '#c4c4c4', fontSize: '12px', marginLeft: '4px' }}>{repo.forks_count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className={styles.no__repo}>This user does not have any repos yet 🙁</h1>
        )}
      </div>
    </section>
  );
};

export default ResultSection;