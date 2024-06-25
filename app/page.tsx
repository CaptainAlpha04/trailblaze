'use client'
import Link from 'next/link'
import { MouseEvent, useEffect, KeyboardEvent } from 'react'

function randomFieldValue() {
  const fields = [
      "Computer Science",
      "Mechanical Engineering",
      "Cardiology",
      "Astrophysics",
      "Business Administration",
      "Economics",
      "Spanish Literature",
      "Journalism",
      "Music Production",
      "Political Science",
      "Zoology",
      "Culinary Arts",
      "Graphics Designing",

  ];
  return fields[Math.floor(Math.random() * fields.length)];
}


async function handleRequest() {
    const career: string = (document.getElementById("generalizedInput") as HTMLInputElement).value;
    if (career === "") {
      (document.getElementById('input_alert') as HTMLDialogElement)?.showModal();
      return;
    } else {
      window.location.href = `/result/${career}`;
    }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    handleRequest();
  }
}

function Page() {

  useEffect(()=>{
    if(localStorage.getItem('careerData')){
      localStorage.removeItem('careerData');
    }
  }, []);


  const value = randomFieldValue();
  return (
    <>
    <dialog id="input_alert" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Please Enter a valid Career!</h3>
        <p className="py-4">Press <kbd className='kbd'>ESC</kbd> key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <section className="bg-cover" style={{ backgroundImage: 'url("https://www.10wallpaper.com/wallpaper/1366x768/1709/Lines_grid_black-Vector_HD_Wallpaper_1366x768.jpg")' }}>
      <div className="min-h-screen min-w-screen py-20 px-5 font-mono hero-content">
        <div>
          <h1 className="text-4xl font-bold">Hello There!</h1>
          <p className="py-6">Welcome to 🔥TrailBlaze: Your AI-Powered Platform for Discovering the Perfect Career Path!</p>
        </div>
        <div className="divider divider-horizontal"></div>
        <div>
          <div>
            <h2 className="text-3xl">Get a Generalized Career Overview ✨</h2>
          <p className="py-6 text-pretty">Enter the career of your choice, and get complete information, resources and guidelines with the power of AI!</p> 
          <input id = "generalizedInput" type="text" placeholder={value + "..."} className="input input-bordered w-full max-w-md bg-base-300 join-item m-2" onKeyDown={handleKeyDown} />
          <button className="btn btn-primary join-item" onClick = {handleRequest}>{"Let's Go"}</button>
        </div>

        <div className="divider">OR</div>
        <div className="flex justify-center align-items-center">
        <h2 className="text-1xl m-3">Let the AI find the right Career for you!✌️ </h2>
          <Link href="/personalized">
          <button className="btn btn-outline">Get Started! 
          </button>
          </Link>
        </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default Page
