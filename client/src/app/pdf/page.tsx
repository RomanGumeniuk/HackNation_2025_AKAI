"use client";
import Background from '@/components/details_page/Background'
import { useState } from 'react';

const page = () => {

    const [type, setType] = useState(-1); // ma byc -1
    const [title , setTitle] = useState("Ustawa z dnia 7 listopada 2025 r. o zmianie ustawy o systemie informacji w ochronie zdrowia oraz ustawy o ochronie ludności i obronie cywilnej");
    const [text, setText] = useState([
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo omnis error consequuntur provident, officiis pariatur quo placeat numquam aperiam non eos, aliquam temporibus autem, minus quidem iste tenetur sequi explicabo.",
    "Soluta corrupti quae aspernatur libero asperiores molestiae officia, eligendi vero dolorem laboriosam repellendus neque iste eveniet delectus repellat deleniti modi autem pariatur, doloribus accusantium ducimus, amet et ea? Explicabo, obcaecati.",
    "Debitis, nihil. Dolor doloremque magni esse maiores incidunt at provident, officiis eum expedita adipisci debitis ipsum illo qui sed vel est dignissimos voluptas voluptatem vero iure dicta inventore! Culpa, pariatur.",
    "Provident non optio veritatis nisi, repellat hic accusamus in cum et nesciunt accusantium fuga necessitatibus deserunt doloribus quos vitae debitis, blanditiis molestiae impedit. Eius, quibusdam? Eaque ad facere maiores temporibus!",
    "Accusantium sit corporis vitae temporibus tempore. Facere molestiae cupiditate, repudiandae necessitatibus, voluptate fugit et reiciendis recusandae corporis eligendi suscipit temporibus. Ipsum molestias tempora officia, totam doloremque quis consequuntur cumque quod.",
    "Consectetur sequi nihil vel nostrum veritatis ea id cum iste maiores nobis fuga qui perspiciatis accusamus recusandae sed dicta corporis incidunt nulla voluptas ipsam, voluptate velit optio delectus! Consectetur, praesentium.",
    "Vitae velit illo, natus ullam obcaecati impedit rerum excepturi laudantium quis nihil, neque sit voluptas adipisci voluptates cupiditate enim incidunt aut nemo laborum quam et. Error eos maxime delectus veniam!",
    "Assumenda esse libero, a ex maxime culpa reiciendis veritatis aliquam quos quae placeat voluptatum sed quod eveniet ea mollitia nemo quam exercitationem in quibusdam! Nobis quasi natus alias voluptas sapiente."
    ]);
    const [file, setFile] = useState(null);
    const [opinia, setOpinia] = useState();

    const handleBaton = () => {
        setOpinia([
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo omnis error consequuntur provident, officiis pariatur quo placeat numquam aperiam non eos, aliquam temporibus autem, minus quidem iste tenetur sequi explicabo.",
    "Soluta corrupti quae aspernatur libero asperiores molestiae officia, eligendi vero dolorem laboriosam repellendus neque iste eveniet delectus repellat deleniti modi autem pariatur, doloribus accusantium ducimus, amet et ea? Explicabo, obcaecati.",
    "Debitis, nihil. Dolor doloremque magni esse maiores incidunt at provident, officiis eum expedita adipisci debitis ipsum illo qui sed vel est dignissimos voluptas voluptatem vero iure dicta inventore! Culpa, pariatur.",
    "Provident non optio veritatis nisi, repellat hic accusamus in cum et nesciunt accusantium fuga necessitatibus deserunt doloribus quos vitae debitis, blanditiis molestiae impedit. Eius, quibusdam? Eaque ad facere maiores temporibus!",
    "Accusantium sit corporis vitae temporibus tempore. Facere molestiae cupiditate, repudiandae necessitatibus, voluptate fugit et reiciendis recusandae corporis eligendi suscipit temporibus. Ipsum molestias tempora officia, totam doloremque quis consequuntur cumque quod.",
    "Consectetur sequi nihil vel nostrum veritatis ea id cum iste maiores nobis fuga qui perspiciatis accusamus recusandae sed dicta corporis incidunt nulla voluptas ipsam, voluptate velit optio delectus! Consectetur, praesentium.",
    "Vitae velit illo, natus ullam obcaecati impedit rerum excepturi laudantium quis nihil, neque sit voluptas adipisci voluptates cupiditate enim incidunt aut nemo laborum quam et. Error eos maxime delectus veniam!",
    "Assumenda esse libero, a ex maxime culpa reiciendis veritatis aliquam quos quae placeat voluptatum sed quod eveniet ea mollitia nemo quam exercitationem in quibusdam! Nobis quasi natus alias voluptas sapiente."
    ]);
    };

    const handleFile = (e) => {
        console.log("wartość:", e.target.value); // dostęp do e
        setFile(e.target.value);

        if (type === 1){
            // feczuj jak dla ustawy
            setType(3);
        }
        if (type === 2){
            // feczuj dla chuj wie czego
            setType(4);
        }

    };


    if (type === -1){ // decyzja co wrzucam
        return <div className={"flex justify-top items-center flex-col h-full"}> 
                        <h1>
                            wybierz typ dokumentu
                        </h1>

                    <div className={"p-2 gap-4 m-2 flex"}>

                        <button onClick={() => setType(1)}>
                            Ustawa
                        </button>
                        <button onClick={() => setType(2)}>
                            Jakis inny
                        </button>                    
                    </div>
                </div>;
    }
    if (type === 1){ //ustawa
        return <div> 
                   <div className={"flex justify-top items-center flex-col h-screen"}>
                        <h1 className={"mb-3 text-2 font-bold"}>Wgraj plik PDF</h1>

                       <input type="file" onChange={handleFile} accept="application/pdf" className={"border p-2 rounded "}/>

                    </div>
                </div>;
    }
    if (type === 2){ // wniossek
        return <div> 
                   <div className={"flex justify-top items-center flex-col h-screen"}>
                        <h1 className={"mb-3 text-2 font-bold"}>Wgraj plik PDF</h1>

                       <input type="file" onChange={handleFile} accept="application/pdf" className={"border p-2 rounded "}/>

                    </div>
                </div>;
    }

    if (type === 3){ //ustawa
        return <div>
                    <div className="flex justify-center items-center">
                        <h1 className="ml-5 text-2xl font-bold leading-snug">{title}</h1>
                    </div>

                    <Background>
                    <div className="leading-relaxed text-sm space-y-4">
                        {text.map((text_2, idx) => (
                        <p key={idx}>{text_2}</p>
                        ))}
                    </div>
                    </Background>
                    <div className='flex justify-center m-2'>
                    <button className={' m-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'} type='button' onClick={handleBaton}>Poproś naszego asystena o anilizę tej ustawy</button>
                    </div>
                    {opinia && <Background>
                        <div className="leading-relaxed text-sm space-y-4">
                        {opinia.map((opinia_2, idx) => (
                            <p key={idx}>{opinia_2}</p>
                        ))}
                        </div>
                    </Background>}
                </div>;
    }

    if (type === 4){ // wniosek
        return <div>
                    <div className="flex justify-center items-center ">
                        <h1 className="ml-4 text-2xl font-bold leading-snug">Chętnie pomogę tobie z tym wnioskiem</h1>
                    </div>

                        <Background>
                    <div className="leading-relaxed text-sm space-y-4">
                        {text.map((text_2, idx) => (
                        <p key={idx}>{text_2}</p>
                        ))}
                    </div>
                        </Background>
                    <div className={'flex justify-center items-center'} >
                        <h1 className={'text-2xl font-bold m-8'}>W razie pytań dopytaj się mnie na chatcie po prawej stronie!</h1>
                        </div>
                </div>;
        }

}

export default page;