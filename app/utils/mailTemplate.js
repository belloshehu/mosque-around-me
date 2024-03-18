export const getEmailTemplate = (textBody, textHeading) => {
  return `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <style>
                    .container {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    }
                    body {
                        background-color: rgba(50, 50, 50, 0.2);
                        color: black;
                        padding: 20px;
                        font-size: 2.5rem;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 5rem;
                        width: 100%;
                        padding: auto;
                    }
                    .heading {
                        font-size: 1rem;
                        text-align: center;
                    }
                    .header {
                        text-align: center;
                        background-color: rgba(59, 7, 100, 0.8);
                        color: white;
                        padding: 5px;
                        border-radius: 20px 20px 0px 0px;
                        margin: 3rem auto;
                        width: 100%; 
                    }
                    .footer {
                        font-size: small;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 5px;
                        background-color: aliceblue;
                        color: black;
                        border-top: 1px dashed gray;
                        padding: 20px 10px;
                        margin: 3rem auto;
                        width: 100%; 
                    }
                    .main {
                        min-height: 30vh;
                        padding: 20px;
                        color: black;
                        margin: 1rem auto;    
                        font-size: 1.5rem; 
                        width: 100%;          
                    }
                    ul {
                        list-style: none;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        gap: 20px;
                        padding: 0%;
                        margin: 0%;
                    }
                    ul a {
                        text-decoration: none;
                    }
                    ul a:hover {
                        text-decoration: underline;
                    }
                    .address{
                        font-style: italic;
                    }
                    @media screen and (min-width: 567px) {
                        .main {
                            padding: 20px;
                            text-align: center;
                            margin: 1rem auto;
                        }
                        .heading {
                            font-size: 2.5rem;
                            text-align: center;
                        }
                        .header, .footer, .main{
                            width: 50%;
                        }
                    }
                </style>
            </head>
            <body>
                    <header class="header">
                        <img src="/logo.png" alt="logo" height="30" width="30" style="border-radius: 50%; margin-bottom: 1.5rem;"/>
                        <h3 class="heading">${textHeading}</h3>
                    </header>
                    <div class="main">
                        ${textBody}
                        <p>Mosque connect Team.</p>    
                    </div>
                    <footer class="footer">
                        <small class="address">shop 2, pti shopping complex, pti road, effurun</small>
                    </footer>
            </body>
        </html>

  `;
};
