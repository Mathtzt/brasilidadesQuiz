import React from "react";
import Head from 'next/head';
import db from '../../../db.json';

export default function Header() {
    return (
        <div>
            <Head>
                <title>Quiz - Imersão React</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Quiz - Imersão React" />
                <meta property="og:description" content="Quiz criado durante a Imersão React Next.js." />
                <meta property="og:image" content={db.bgMeta} />
                <meta property="og:url" content="https://quiz-base.mathtzt.vercel.app/" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
            </Head>
        </div>
    );
}
