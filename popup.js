document.getElementById("captureAndPrintButton").addEventListener("click", () => {
    // Obtém a aba ativa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id; // Obtém o ID da aba ativa

        chrome.scripting.executeScript({
            target: { tabId: tabId }, // Passa o tabId aqui
            func: captureAndPrint // A função que será executada na página
        });
    });
});

function captureAndPrint() {
    // Função para calcular o XPath de um elemento
    function findXPathForElement(element) {
        let xpath = '';
        while (element && element.nodeType === 1) { // Se for um elemento (tipo de nó 1)
            let index = 1;
            let sibling = element.previousElementSibling;

            // Contar o número de irmãos com o mesmo nome de tag
            while (sibling) {
                if (sibling.tagName === element.tagName) {
                    index++;
                }
                sibling = sibling.previousElementSibling;
            }

            // Adicionar a parte do XPath (tag e índice)
            xpath = '/' + element.tagName.toLowerCase() + '[' + index + ']' + xpath;
            element = element.parentNode;
        }
        return xpath || null;
    }

    // Obtém o elemento base e calcula o prefixo do XPath
    const elements = document.getElementsByClassName('text-blue-8');
    let xpathFirst23 = '';

    if (elements.length > 0) {
        const element = elements[0];
        const xpath = findXPathForElement(element);
        xpathFirst23 = xpath ? xpath.substring(0, 23) : '';
        console.log("XPath do elemento:", xpathFirst23);
    } else {
        console.error("Nenhum elemento encontrado com a classe especificada.");
    }

    // Array de XPaths relativos
    const xpaths = [
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/div[2]/div[4]/div[3]/div/div[1]",  // TITULO CHAVE 4.1                 0
        "/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[4]/div[3]/div/div[1]",  // TITULO CHAVE "consulta" 4.2                                          1
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/div[2]/div[4]/div[3]/div/div[2]",  // CHAVE 5.1                        2
        "/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[4]/div[3]/div/div[2]",  // CHAVE "consulta" 5.2                                                 3
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/div[2]/div[1]/div[1]/div/div[1]", // TITULO UNIDADE EXECUTANTE 0.1     4
        "/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[1]/div[1]/div/div[1]", // TITULO UNIDADE EXECUTANTE "consulta" 0.2                              5
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/div[2]/div[1]/div[1]/div/div[2]", // UNIDADE EXECUTANTE 1.1            6
        "/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[1]/div[1]/div/div[2]", // UNIDADE EXECUTANTE "consulta" 1.2                                     7
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/div[2]/div[4]/div[2]/div/div[1]", // TITULO DATA E HORARIO 2.1         8
        "/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[4]/div[2]/div/div[1]", // TITULO DATA E HORARIO "consulta" 2.2                                  9
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[3]/div[2]/div[4]/div[2]/div/div[2]",  // DATA E HORARIO 3.1               10
        "/div/div[2]/div/div[2]/div/div/div/div[3]/div[2]/div[4]/div[2]/div/div[2]",  // DATA E HORARIO "consulta" 3.2                                        11
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[4]/div", // TITULO DADOS DO PACIENTE 6.1                                  12
        "/div/div[2]/div/div[2]/div/div/div/div[4]/div", // TITULO DADOS DO PACIENTE "consulta" 6.2                                                           13
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[5]/div[1]/div/div[1]",  // TITULO CNS 7.1                                 14
        "/div/div[2]/div/div[2]/div/div/div/div[5]/div[1]/div/div[1]",  // TITULO CNS "consulta" 7.2                                                          15
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[5]/div[1]/div/div[2]",   // NUMERO CNS 8.1                                16
        "/div/div[2]/div/div[2]/div/div/div/div[5]/div[1]/div/div[2]",  // NUMERO CNS "consulta" 8.2                                                          17
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[5]/div[4]/div/div[1]", // TITULO NOME 9.1                                 18
        "/div/div[2]/div/div[2]/div/div/div/div[5]/div[4]/div/div[1]", // TITULO NOME "consulta" 9.2                                                          19
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[5]/div[4]/div/div[2]", // NOME 10.1                                       20
        "/div/div[2]/div/div[2]/div/div/div/div[5]/div[4]/div/div[2]", // NOME "consulta" 10.2                                                                21
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[8]/div", // TITULO DADOS DA SOLICITAÇÃO 11.1                              22
        "/div/div[2]/div/div[2]/div/div/div/div[8]/div", // TITULO DADOS DA SOLICITAÇÃO "consulta" 11.2                                                       23
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[9]/div[1]/div[1]/div/div[1]", // IDENTIFICADOR 12.1                       24
        "/div/div[2]/div/div[2]/div/div/div/div[9]/div[1]/div[1]/div/div[1]", // IDENTIFICADOR "consulta" 12.2                                                25
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[9]/div[1]/div[1]/div/div[2]", // NUMERO DA SOLICITACAO 13.1               26
        "/div/div[2]/div/div[2]/div/div/div/div[9]/div[1]/div[1]/div/div[2]", // NUMERO DA SOLICITACAO "consulta" 13.2                                        27
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[10]/div", // TITULO PROCEDIMENTO 14.1                                     28
        "/div/div[2]/div/div[2]/div/div/div/div[10]/div", // TITULO PROCEDIMENTO "consulta" 14.2                                                              29
        "/div/div/div[3]/main/div/div/div/div[2]/div/div/div/div/div[1]/div/div/div[11]/div/div[1]", // PROCEDIMENTO 15.1                                     30
        "/div/div[2]/div/div[2]/div/div/div/div[11]/div/div[1]" // PROCEDIMENTO "consulta" 15.1                                                               31
    ];

    // Atualiza os XPaths com o prefixo
    const updatedXpaths = xpaths.map(xpath => xpathFirst23 + xpath);
    let content = "";

    // Para cada XPath atualizado, busca os elementos correspondentes
    updatedXpaths.forEach((xpath, index) => {
        const elements = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (elements.snapshotLength > 0) {
            for (let i = 0; i < elements.snapshotLength; i++) {
                const element = elements.snapshotItem(i);

                // Aplica estilos específicos dependendo do índice
                switch (index) {
                    case 0:
                        element.style.marginTop = "0px";
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "8px";
                        break;
                    case 1:
                        element.style.marginTop = "0px";
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "8px";
                        break;
                    case 2:
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "9px";  // Fonte maior para o segundo XPath
                        break;
                    case 3:
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "9px";  // Fonte maior para o segundo XPath
                        break;
                    case 4:
                        element.style.color = "black";
                        element.style.marginBottom = "2px"
                        element.style.marginTop = "10px"
                        element.style.textTransform = "uppercase";
                        element.style.fontWeight = "bold";
                        element.style.fontSize = "12px";
                        break;
                    case 5:
                        element.style.color = "black";
                        element.style.marginBottom = "2px"
                        element.style.marginTop = "10px"
                        element.style.textTransform = "uppercase";
                        element.style.fontWeight = "bold";
                        element.style.fontSize = "12px";
                        break;
                    case 6:
                        element.style.color = "red";
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "11px";  // Fonte maior para o segundo XPath
                        break;
                    case 7:
                        element.style.color = "red";
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "11px";  // Fonte maior para o segundo XPath
                        break;
                    case 8:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 9:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 10:
                        element.style.marginBottom = "2px";
                        element.style.fontWeight = "lighter";
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 11:
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;

                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 12:
                        element.style.marginTop = "10px"
                        element.style.marginBottom = "10px"
                        element.style.marginTop = "5 px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "12px";
                        element.style.textDecoration = "underline"
                        break;
                    case 13:
                        element.style.marginTop = "10px"
                        element.style.marginBottom = "10px"
                        element.style.marginTop = "5 px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "12px";
                        element.style.textDecoration = "underline"
                        break;
                    case 14:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 15:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 16:
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 17:
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 18:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 19:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 20:
                        element.style.marginBottom = "2px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 21:
                        element.style.marginBottom = "2px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 22:
                        element.style.marginTop = "10px"
                        element.style.marginBottom = "10px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        element.style.textDecoration = "underline"
                        break;
                    case 23:
                        element.style.marginTop = "10px"
                        element.style.marginBottom = "10px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        element.style.textDecoration = "underline"
                        break;
                    case 24:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 25:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 26:
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 27:
                        element.style.marginBottom = "4px"
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 28:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 29:
                        element.style.marginBottom = "2px"
                        element.style.textTransform = "uppercase";
                        element.style.color = "black"
                        element.style.fontWeight = "bold";  // Negrito
                        element.style.fontSize = "11px";
                        break;
                    case 30:
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                    case 31:
                        element.style.color = "black"
                        element.style.fontFamily = "Arial, sans-serif";  // Família de fontes para o quarto XPath
                        element.style.fontSize = "10px";  // Fonte maior para o segundo XPath
                        break;
                }

                content += element.outerHTML; // Adiciona o HTML do elemento
            }
        }
    });

    if (!content) {
        alert("Nenhum elemento encontrado!");
        return;
    }

    // Cria uma nova janela para a impressão
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
        <html>
            <head>
                <title>Impressão</title>
                <style>

                    header {
                    
                        display: flex;
                        flex-direction: column;

                    }

                    body {
                        font-family: Arial, sans-serif;
                    }
                        esus {
                        font-family: Verdana, sans-serif;
                        font-weight: bold;
                        margin: 0px;
                        font-size: 40px;
                        margin-bottom: 0px;
                        }

                        reg {
                         font-family: Arial, sans-serif;
                         font-size: 10px;
                         margin-top: 0px;
                         margin-left: 3px;
                         margin-bottom: 10px;
                        }

                        p {
                         font-family: Arial, sans-serif;
                         font-size: 12px;
                         text-align: center;
                         font-weight: bold;
                         margim-bottom: 3px;
                        }

                        p2 {
                         font-family: Arial, sans-serif;
                         font-size: 10px;
                         text-align: justify;
                        }


                </style>
            </head>
            <body>

            <header>

            <esus> 
            E-SUS
            </esus>

            <reg> 
            REGULAÇÃO
            </reg>

            </header>
                ${content}

            <p>
            >> ATENÇÃO! <<
            </p>

            <p2> 
            CASO VOCÊ NÃO POSSA COMPARECER, FAVOR NOS COMUNICAR COM ANTECEDÊNCIA, <b>ATÉ 5 DIAS ANTES</b> DE FORMA PRESENCIAL NO SEU POSTO DE SAÚDE OU PELO <b>TELEFONE: 3196-2460 (OPÇÃO 2)</b>, PARA QUE POSSAMOS AGENDAR PARA OUTRO USUÁRIO.
            <p2>
            

            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
