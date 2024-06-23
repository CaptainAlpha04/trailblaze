'use client'
import { useParams} from 'next/navigation';
import useFetchCareer from '../../hooks/useFetchCareer'; // Adjust the path as necessary
import Loading from '../loading';

const getDifficultyClass = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'very easy':
      return 'text-blue-500';
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    case 'very hard':
      return 'text-purple-500';
    default:
      return '';
  }
};

const Page = async () => {
  const { career } = useParams();
    const result = await useFetchCareer(career);
    const data = result.data?.message;
    console.log(data)


  return (
    <section>
      {!data ? <Loading />:
      <div className="min-h-screen min-w-screen py-20 px-5 font-mono flex flex-wrap gap-5">
        <div className="card w-1/4 bg-base-200 shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Recommended Career</h1>
            <h2 className="text-3xl">{data['Recommended Career']}</h2>
          </div>
        </div> 

        <div className='card w-1/4 bg-base-200 shadow-xl font-mono'>
          <div className='card-body'>
          <h1 className="card-title">Average Global Salary</h1>
          <h2 className="text-xl">{data['Average Salary WorldWide']}</h2>  
          </div>
        </div>  
        
        <div className='card w-1/4 bg-base-200 shadow-xl font-mono'>
          <div className='card-body'>
          <h1 className="card-title">Similar Career</h1>
          <h2 className="text-s">{data['Similar Careers'].map((c:string) => { return <li key={c}>{c}</li>})}</h2>
          </div>  
        </div>

        <div className='card w-1/6 bg-base-200 shadow-xl font-mono'>
          <div className='card-body rounded-lg'>
          </div>
        </div>

          <div className="card w-2/4 bg-base-200 shadow-xl font-mono">
            <div className="card-body">
              <h1 className="card-title">Description</h1>
              <h2 className="text-s">{data['About Recommend Career']}</h2>
            </div>
          </div>
          {
          data['Prerequisites']?
          <div className="card w-2/5 bg-base-200 shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Prerequisite</h1>
            <h2 className="text-s">
              {data['Prerequisites'].map((p:string) => {return <li key={p}>{p}</li>})}
            </h2>
          </div>
        </div>:

        <div className="card w-2/5 bg-base-200 shadow-xl font-mono">
        <div className="card-body">
          <h1 className="card-title">Prerequisite</h1>
          <h2 className="text-s">
            {data['Reasoning']}
          </h2>
        </div>
      </div>
          }
        
        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Roadmap</h1>
            <h2 className="text-s">{data['Roadmap']}</h2>
          </div>
        </div> 

        <div className="card w-screen bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title text-yellow-500">Note</h1>
            <h2 className="text-s">Some of these links might not be working due to link updation or deletion of content by their respective author/owner.</h2>
          </div>
        </div> 

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Courses</h1>
            <p className="text-s">
            {data['Suggested courses'].map((course: { Name: string; Link: string }) => (
            <li key={course.Link}>
              <a href={course.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-accent">
                {course.Name}
              </a>
            </li>
          ))}
            </p>
          </div>
        </div> 

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Books</h1>
            <p className="text-s">
            {data['Suggested books'].map((book: { Name: string; Link: string }) => (
            <li key={book.Link}>
              <a href={book.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-primary">
                {book.Name}
              </a>
            </li>
          ))}
            </p>
          </div>
        </div> 

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Resources</h1>
            <p className="text-s">
            {data['Suggested Resources'].map((res: { Name: string; Link: string }) => (
            <li key={res.Link}>
              <a href={res.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-secondary">
                {res.Name}
              </a>
            </li>
          ))}
            </p>
          </div>
        </div> 

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Github Repositories</h1>
            <p className="text-s">
            {data['Suggested github repositories'].map((repo: { Name: string; Link: string }) => (
            <li key={repo.Link}>
              <a href={repo.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-secondary">
                {repo.Name}
              </a>
            </li>
          ))}
            </p>
          </div>
        </div>

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Podcasts</h1>
            <p className="text-s">
            {data['Suggested Podcasts'].map((pod: { Name: string; Link: string }) => (
            <li key={pod.Link}>
              <a href={pod.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-error">
                {pod.Name}
              </a>
            </li>
          ))}
            </p>
          </div>
        </div>

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Youtube Channels</h1>
            <p className="text-s">
            {data['Suggested YouTube Channels'].map((channel: { Name: string; Link: string }) => (
            <li key={channel.Link}>
              <a href={channel.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-warning">
                {channel.Name}
              </a>
            </li>
          ))}
            </p>
          </div>
        </div>

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Trending SM Influencers</h1>
            <p className="text-s">
            {data['Suggested Social Media Influencers'].map((inf: { Name: string; Info: string, Link: string }) => (
            <li key={inf.Link}>
              <a href={inf.Link} target="_blank" rel="noopener noreferrer" className="link link-hover hover: link-success">
                {inf.Name}
              </a>
              <p>{inf.Info}</p>
            </li>
          ))}
            </p>
          </div>
        </div>

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Projects</h1>
            <p className="text-s">
            {data['Suggested Projects'].map((proj: { Name: string; Description: string, Difficulty: string }) => (
            <p key={proj.Name}>
              <li className="text-md font-bold">{proj.Name} <span className={getDifficultyClass(proj.Difficulty)}>({proj.Difficulty})</span>
            </li>
              <p className="text-s">{proj.Description}</p>
            </p>
          ))}
            </p>
          </div>
        </div>

        <div className="card w-fit bg-base-200 h-fit shadow-xl font-mono">
          <div className="card-body">
            <h1 className="card-title">Suggested Activities</h1>
            <p className="text-s">
            {data['Suggested activities'].map((act: { Name: string; Description: string}) => (
            <p key={act.Name}>
              <li className="text-md font-bold">{act.Name}</li>
              <p className="text-s">{act.Description}</p>
            </p>
          ))}
            </p>
          </div>
        </div>

      </div>}
    </section>
  );
};

export default Page;
