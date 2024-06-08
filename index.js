let station;
document.getElementById('nationalIDForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nationalID = document.querySelector('input[name="nationalID"]').value;
    const inputID = document.getElementById("inputID");
    const errorString = document.getElementById("errorString");
    
    if (nationalID.length !== 14 || isNaN(nationalID)) {
        inputID.style.border = "2px solid red";
        errorString.innerHTML = "You must enter a 14-digit number.";
        errorString.style.color = "red";
        errorString.style.fontSize = "14px";
        return;
    } else {
        inputID.style.border = "2px solid green";
        errorString.innerHTML = "";
    }

    let stationNum = nationalID.slice(7, 9);
    station = stationNum;
    console.log("this is " + station);
    const year = extractYearFromNationalID(nationalID);
    const month = extractMonthFromNationalID(nationalID);
    const day = nationalID.slice(5, 7);
    const gender = getGenderFromNationalID(nationalID);
    const ageDetails = getAge(year, month, day);
    const country = getCountry(nationalID);

    if (document.getElementById("idUser")) {
        document.getElementById("idUser").innerHTML = "ID User: " + nationalID;
    }
    if (document.getElementById('year')) {
        document.getElementById('year').innerText = "Year: " + year;
    }
    if (document.getElementById('month')) {
        document.getElementById('month').innerText = "Month: " + month;
    }
    if (document.getElementById('day')) {
        document.getElementById('day').innerText = "Day: " + day;
    }
    if (document.getElementById('gender')) {
        document.getElementById('gender').innerText = "Your Gender: " + gender;
    }
    if (document.getElementById('age')) {
        document.getElementById('age').innerText = `Age: ${ageDetails.years}  months:${ageDetails.months} days:${ageDetails.days}`;
    }
    if (document.getElementById('ageInDays')) {
        document.getElementById('ageInDays').innerHTML = `Age In Days: ${calculateAgeInDays(year, month, day)}`;
    }
    if (document.getElementById('details')) {
        document.getElementById('details').style.display = 'block';
    }
});

function extractYearFromNationalID(nationalID) {
    let yearPart = nationalID.substring(1, 3);
    let centuryCode = nationalID.charAt(0);

    let century;
    switch (centuryCode) {
      case '1':
        century = 1800;
        break;
        case '2':
            century = 1900;
            break;
        case '3':
            century = 2000;
            break;
        case '4':
            century = 2900;
            break;
        default:
            throw new Error("Invalid century code in national ID.");
    }

    let year = century + parseInt(yearPart);
    return year;
}

function extractMonthFromNationalID(nationalID) {
    let monthPart = nationalID.substring(3, 5);
    let month = parseInt(monthPart, 10);

    if (month < 1 || month > 12) {
        throw new Error("Invalid month in national ID.");
    }

    return month;
}

function getGenderFromNationalID(nationalID) {
    let type = nationalID.slice(12, 13);
    
    return (parseInt(type) % 2 === 0) ? "Female" : "Male";
}

function getAge(year, month, day) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let retirementAge = document.getElementById("retirementAge")

    let age = today.getFullYear() - birthDate.getFullYear();

    console.log(age)
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
  let ageRet = 60 - age
    retirementAge.innerHTML = "متبقي علي سن التقاعد : " + ageRet + " سنه"
    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        age--;
        ageMonths += 12;
    }

    let AgeInMonths = document.getElementById("AgeInMonths");
    let AgeInDays = document.getElementById("AgeInDays");
    let ageInHour = document.getElementById("ageInHour");

    if (AgeInMonths) {
        AgeInMonths.innerHTML = `Age In Months: ${age * 12 + ageMonths}`;
    }
    if (AgeInDays) {
        AgeInDays.innerHTML = `Age In Days: ${calculateAgeInDays(year, month, day)}`;
    }
    if (ageInHour) {
        ageInHour.innerHTML = `Age In Hours: ${calculateAgeInDays(year, month, day) * 24}`;
    }

    return {
        years: age,
        months: ageMonths,
        days: ageDays,
    };
}

function calculateAgeInDays(year, month, day) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    const diffDays = Math.round(Math.abs((today - birthDate) / oneDay));
    
    return diffDays;
}

const governorates = {
  "Cairo": "01",
  "Alexandria": "02",
  "Port Said": "03",
  "Suez": "04",
  "Damietta": "11",
  "Dakahlia": "12",
  "Sharqia": "13",
  "Qalyubia": "14",
  "Kafr El Sheikh": "15",
  "Gharbia": "16",
  "Menoufia": "17",
  "Beheira": "18",
  "Ismailia": "19",
  "Giza": "21",
  "Beni Suef": "22",
  "Fayoum": "23",
  "Minya": "24",
  "Assiut": "25",
  "Sohag": "26",
  "Qena": "27",
  "Aswan": "28",
  "Luxor": "29",
  "Red Sea": "31",
  "New Valley": "32",
  "Matrouh": "33",
  "North Sinai": "34",
  "South Sinai": "35"
};

function getCountry(nationalID) {
    let stationNum = nationalID.slice(7, 9);
    console.log(stationNum);
    for (let key in governorates) {
        if (governorates[key] == stationNum) {
            if (document.getElementById("country")) {
                document.getElementById("country").innerHTML = "Your City: " + key;
            }
            return key;
        }
    }
    return null;
}
console.log(year)