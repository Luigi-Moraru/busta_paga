function avvio() { //creazione tabella per mese vuota
    var anno = new Date().getFullYear();
    var bisestile, data
    if (anno % 4 == 0)
        bisestile = true;
    else
        bisestile = false;
    mese = document.getElementById("mese").value;

    var giorni;
    if (mese == 'Gennaio' || mese == 'Marzo' || mese == 'Maggio' || mese == 'Luglio' || mese == 'Agosto' || mese == 'Ottobre' || mese == 'Dicembre')
        giorni = 31;
    else if (mese == 'Novembre' || mese == 'Aprile' || mese == 'Settembre' || mese == 'Giugno')
        giorni = 30;
    else {
        if (bisestile)
            giorni = 29;
        else
            giorni = 28;
    }
    switch (mese) {
        case 'Gennaio':
            mese = '01';
            break;
        case 'Febbraio':
            mese = '02';
            break;
        case 'Marzo':
            mese = '03';
            break;
        case 'Aprile':
            mese = '04';
            break;
        case 'Maggio':
            mese = '05';
            break;
        case 'Giugno':
            mese = '06';
            break;
        case 'Luglio':
            mese = '07';
            break;
        case 'Agosto':
            mese = '08';
            break;
        case 'Settembre':
            mese = '09';
            break;
        case 'Ottobre':
            mese = '10';
            break;
        case 'Novembre':
            mese = '11';
            break;
        case 'Dicembre':
            mese = '12';
            break;
    }

    let table = document.createElement('table');
    table.setAttribute('id', 'table');

    var row = [];
    row[0] = table.insertRow();

    var ggMese = row[0].insertCell();
    ggMese.setAttribute("id", "ggMese");
    ggMese.innerHTML = 'Data';

    let ggSettimana = row[0].insertCell(); //scrive il giorno da Lunedì a Domenica
    ggSettimana.setAttribute("id", "ggSettimana");
    ggSettimana.innerHTML = 'Giorno';

    let turno = row[0].insertCell(); //input per tipo di turno(da compilare)
    turno.setAttribute("id", "turno");
    turno.innerHTML = 'Turno';

    let fest = row[0].insertCell() //flag per festività
    fest.setAttribute("id", "fest");
    fest.innerHTML = 'Festività';

    let OrdDay = row[0].insertCell(); //ore ordinarie diurne
    OrdDay.setAttribute("id", "OrdDay");
    OrdDay.innerHTML = 'Ordinario Diurno';

    let StrDay = row[0].insertCell(); //ore straordinarie diurne
    StrDay.setAttribute("id", "StrDay");
    StrDay.innerHTML = 'Straordinario Diurno';

    let OrdNight = row[0].insertCell(); //ore ordinarie notturne
    OrdNight.setAttribute("id", "OrdNight");
    OrdNight.innerHTML = 'Ordinario Notturno';

    let StrNight = row[0].insertCell(); //ore straordinarie notturne
    StrNight.setAttribute("id", "StrNight");
    StrNight.innerHTML = 'Straordinario Notturno';

    let n1 = row[0].insertCell(); //assenza non retribuita o giarnata straordinaria
    n1.setAttribute("id", "n1-");
    n1.innerHTML = 'Assenza non retribuita';

    for (let i = 1; i <= giorni; i++) { //corpo della tabella
        row[i] = table.insertRow();
        row[i].setAttribute('id', 'tr' + i);

        data = new Date(anno + '-' + mese + '-' + i);
        data = data + "";
        giorno = data.substring(0, 3);
        data = data.substring(4, 16);

        ggMese = row[i].insertCell();
        ggMese.setAttribute("id", "ggMese" + i);
        ggMese.innerHTML = data;

        ggSettimana = row[i].insertCell(); //scrive il giorno da Lunedì a Domenica
        ggSettimana.setAttribute("id", "ggSettimana" + i);
        ggSettimana.innerHTML = giorno;

        turno = row[i].insertCell(); //input per tipo di turno(da compilare)
        turno.innerHTML = '<select onchange="wHours(' + i + ')" id="turno' + i + '"> \n\t<option id="R' + i + '">R</option> \n\t<option id="D' + i + '">D</option> \n\t<option id="N1' + i + '">N1</option> \n\t<option id="N2' + i + '">N2</option> \n\t<option id="N3' + i + '">N3</option> \n</select>';

        fest = row[i].insertCell(); //checkbox per festività
        fest.innerHTML = '<input id="fest' + i + '" type="checkbox">';

        OrdDay = row[i].insertCell(); //ore ordinarie diurne
        OrdDay.setAttribute("id", "OrdDay" + i);
        OrdDay.innerHTML = '';

        StrDay = row[i].insertCell(); //ore straordinarie diurne
        StrDay.innerHTML = '<input id="StrDay' + i + '" type="number" max="12" min="0" value="0">';

        OrdNight = row[i].insertCell(); //ore ordinarie notturne
        OrdNight.setAttribute("id", "OrdNight" + i);
        OrdNight.innerHTML = '';

        StrNight = row[i].insertCell(); //ore straordinarie notturne
        StrNight.innerHTML = '<input id="StrNight' + i + '" type="number" max="12" min="0" value="0">';

        n1 = row[i].insertCell(); //assenza non retribuita o giarnata straordinaria
        n1.setAttribute("id", "n1-" + i);
        n1.innerHTML = '';
    }

    let fine = table.insertRow();

    ggMese = fine.insertCell();
    ggMese.innerHTML = 'Totale';

    ggSettimana = fine.insertCell(); //tasto per calcolare i totali
    ggSettimana.setAttribute("id", "fine");
    ggSettimana.innerHTML = '<button onclick="totOre(' + giorni + '),n1(' + giorni + ',' + 1 + ')">Calcola</button>';

    turno = fine.insertCell();
    turno.innerHTML = '<button onclick="input(' + giorni + ')">Import</button>';

    fest = fine.insertCell();
    fest.innerHTML = '-';

    totOrdDay = fine.insertCell(); //totale ore ordinarie diurne
    totOrdDay.setAttribute("id", "totOrdDay");

    totStrDay = fine.insertCell(); //totatle ore straordinarie diurne
    totStrDay.setAttribute("id", "totStrDay");

    totOrdNight = fine.insertCell(); //ore ordinarie notturne
    totOrdNight.setAttribute("id", "totOrdNight");

    totStrNight = fine.insertCell(); //ore straordinarie notturne
    totStrNight.setAttribute("id", "totStrNight");

    n1 = fine.insertCell(); //assenza non retribuita o giarnata straordinaria
    n1.innerHTML = '-';

    document.getElementById('body').append(table);
}

function wHours(i) { //compilazione delle ore per tipo turno
    let lettera = document.getElementById("turno" + i).value;
    switch (lettera) {
        case "D":
            document.getElementById('OrdDay' + i).innerHTML = '8';
            document.getElementById('OrdNight' + i).innerHTML = '';
            document.getElementById('tr' + i).setAttribute('class', 'L');
            break;
        case "N1":
            document.getElementById('OrdDay' + i).innerHTML = '3';
            document.getElementById('OrdNight' + i).innerHTML = '5';
            document.getElementById('tr' + i).setAttribute('class', 'L');
            break;
        case "N2":
            document.getElementById('OrdDay' + i).innerHTML = '2';
            document.getElementById('OrdNight' + i).innerHTML = '6';
            document.getElementById('tr' + i).setAttribute('class', 'L');
            break;
        case "N3":
            document.getElementById('OrdDay' + i).innerHTML = '2';
            document.getElementById('OrdNight' + i).innerHTML = '6';
            document.getElementById('StrDay' + i).value = '2';
            document.getElementById('StrNight' + i).value = '1';
            document.getElementById('tr' + i).setAttribute('class', 'L');
            break;
        default:
            document.getElementById('OrdDay' + i).innerHTML = '';
            document.getElementById('OrdNight' + i).innerHTML = '';
            document.getElementById('StrDay' + i).value = '0';
            document.getElementById('StrNight' + i).value = '0';
            document.getElementById('tr' + i).setAttribute('class', 'R');
    }
}

function totOre(giorni) { //calcolo dei totali, logica tipo tesis
    let totOrdDay = 0,
        totStrDay = 0,
        totOrdNight = 0,
        totStrNight = 0;
    for (let i = 1; i <= giorni; i++) {
        //ore ordinarie diurne
        let primo = document.getElementById('OrdDay' + i).innerHTML;
        if (primo == '')
            primo = 0;
        else
            primo = parseInt(primo);
        totOrdDay += primo;
        //ore ordinarie notturne
        let secondo = document.getElementById('OrdNight' + i).innerHTML;
        if (secondo == '')
            secondo = 0;
        else
            secondo = parseInt(secondo);
        totOrdNight += secondo;
        //ore straordinarie diurne
        let terzo = document.getElementById('StrDay' + i).value;
        totStrDay += parseInt(terzo);
        //ore straordinarie notturne
        let quarto = document.getElementById('StrNight' + i).value;
        totStrNight += parseInt(quarto);
    }
    document.getElementById("totOrdDay").innerHTML = totOrdDay;
    document.getElementById("totOrdNight").innerHTML = totOrdNight;
    document.getElementById("totStrDay").innerHTML = totStrDay;
    document.getElementById("totStrNight").innerHTML = totStrNight;
}

function n1(giorni, i) { //ricorsiva per straordinari e assenze non retribuite
    let lWeek, //valore massimo possibile per la settimana
        day = document.getElementById('ggSettimana' + +i).innerHTML,
        lavorabili = 0,
        lavorati = 0;
    switch (day) {
        case 'Mon':
            lWeek = 7;
            break;
        case 'Tue':
            lWeek = 6;
            break;
        case 'Wed':
            lWeek = 5;
            break;
        case 'Thu':
            lWeek = 4;
            break;
        case 'Fri':
            lWeek = 3;
            break;
        case 'Sat':
            lWeek = 2;
            break;
        default:
            lWeek = 1;
    }
    if (lWeek + i > giorni) { //valore massimo per l'ultima settimana del mese
        lWeek = giorni - i + 1;
    }
    for (let cont = 0; cont < lWeek; cont++) { //si contano i lavorabili e i lavorati
        day = document.getElementById('ggSettimana' + (cont + i)).innerHTML
        if (!(day === 'Sat') && !(day === 'Sun') && !(document.getElementById('fest' + (cont + i)).checked))
            lavorabili++;
        if (document.getElementById("turno" + (cont + i)).value != 'R')
            lavorati++;
        document.getElementById('n1-' + (cont + i)).innerHTML = '';
    }
    let assenze = 0; //si incrementa per ogni assenza non retribuita
    for (let cont = 0; cont < lWeek; cont++) {
        if (document.getElementById("turno" + (cont + i)).value == 'R' && lavorati + assenze < lavorabili) {
            document.getElementById('n1-' + (cont + i)).innerHTML = 'Assenza Non Retribuita';
            assenze++;
        }
    }
    let straordinari = 0;
    for (let cont = lWeek; cont > 0; cont--) {
        if (document.getElementById("turno" + (cont + i - 1)).value != 'R' && lavorati > lavorabili + straordinari) {
            document.getElementById('n1-' + (cont + i - 1)).innerHTML = 'Straordinario';
            let n = document.getElementById('OrdDay' + (cont + i - 1)).innerHTML;
            n = parseInt(n);
            n = (document.getElementById('StrDay' + (cont + i - 1)).value) + n;
            straordinari++;
        }
    }
    if (giorni >= lWeek + i)
        n1(giorni, lWeek + i);
}

function input(giorni) { //compilazione dei turni tramite stringa
    let s = prompt("Inserire stringa per compilare turni:");
    s = s.split(" ");
    for (let i = 1; i <= giorni; i++) {
        if (!isNaN((s[i - 1])))
            s[i - 1] = 'D';
        document.getElementById('turno' + i).value = s[i - 1];
        wHours(i);
    }
}

function busta_paga(giorni) { //vis secondo busta paga
    let ora = 9.07643, //retribuizione per ora
        m30 = (ora + (ora / 100 * 30)).toFixed(5), //maggiorazione 30%
        m60 = (ora + (ora / 100 * 60)).toFixed(5), //maggiorazione 60%
        tot = 0; //totale
    console.log(m30)
    console.log(m60)
    for (i = 1; i <= giorni; i++) {
        let giorno = document.getElementById('OrdDay' + i).innerHTML,
            notte = document.getElementById('OrdNight' + i).innerHTML,
            gs = parseInt(document.getElementById('StrDay' + i).value), //Giorno Straordinario
            ns = parseInt(document.getElementById('StrNight' + i).value); //Notte Straordinario
        if (giorno === '')
            giorno = 0;
        else
            giorno = parseInt(giorno);

        if (notte === '')
            notte = 0;
        else
            notte = parseInt(notte);

        if (document.getElementById('ggSettimana' + i).innerHTML == 'Sun' || document.getElementById('fest' + i).checked)
            tot += (giorno + gs) * m30;
        else
            tot += (giorno + gs) * ora;
        tot += (notte + ns) * m60;
        console.log(tot)
    }
}