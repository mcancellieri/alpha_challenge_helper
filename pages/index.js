import Head from 'next/head'
import styles from '../styles/Home.module.scss'


const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

export const alphabet = ["a", "b", "c", "d", "e"]

export const getWords = function (allNounsText) {
    let allNouns = allNounsText.toLowerCase().split("\n");
    allNouns.sort();
    let currentLetter = "a";
    let currentLetterList = [];
    let wordList = [];
    allNouns.forEach((value) => {
        if (value === "") {
            return
        }
        if (value.toLowerCase().startsWith(currentLetter)) {
            currentLetterList.push(value)
        } else {
            wordList.push(getRandomWordFromList(currentLetterList));
            currentLetterList = [];
            currentLetterList.push(value)
            currentLetter = value[0]
        }
    })
    wordList.push(getRandomWordFromList(currentLetterList));


    return wordList
}

export const getRandomWordFromList = function (list){
    let todayMillis = new Date().getMilliseconds();
    let trueRandom = (Math.random()*todayMillis)/todayMillis;
    let theLastWord = list[Math.floor(trueRandom * list.length)]
    console.log("theWord is: " + theLastWord);
    return theLastWord;
}

export async function getStaticProps() {

    const allNouns = await fetch('http://localhost:3000/nounlist.csv')
        .then(function (response) {
            return response.text()
        })
    return {props: {allNouns: allNouns}}
}

export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';
export default function Home(allNouns) {
    let chosenWords = []
    chosenWords = getWords(allNouns.allNouns);
    return (
        <div className={styles.container}>
            <Head>
                <title>LBAS Alphabet challenge helper </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <a id="skiptocontent" href="#main">
                    Skip to content
                </a>
                <div id="main">
                    <h1>LBAS Alphabet challenge helper</h1>
                    {chosenWords.map((value, i) => {
                        return (<p>{i+1}. <span id="highlight">{value}</span></p>)
                    })}


                </div>
            </main>
        </div>
    )
}
