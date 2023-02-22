//заполнение первоначальных данных
function SetInitialInfo() {
    //выбор из списка отделов того к которому относится сотрудник
    let parentDepartment = document.getElementById("selectedDep");
    let departmentList = document.getElementById("departmentList");
    for (let i = 0; i < departmentList.length; i++) {
        if (departmentList[i].value === parentDepartment.value) {
            departmentList.selectedIndex = i;
            break;
        }
    }
    //рассчет возраста сотрудника
    ChangeAge();
}

function ChangeAge() {    
    let dateOfBirth = document.getElementById("dateOfBirth").value;
    let curDate = new Date();
    let ageInMs = curDate - new Date(dateOfBirth);
    //переводим возраст из мс в годы и оставляем только целую часть
    let age = Math.trunc(ageInMs / 1000 / 60 / 60 / 24 / 365);
    document.getElementById("EmployeeAge").innerHTML = isNaN(age) ? "0" : String(age);
}

function ChangeDepartment(element) {
    document.getElementById("selectedDep").value = element.value;
}

function Validate() {
    let surName = document.form.SurName.value;
    if (surName === "") {
        alert("Поле \"Фамилия\" обязательно для заполнения!");
        document.form.SurName.focus();
        return false;
    }
    if (surName.length > 50) {
        alert("Поле \"Фамилия\" должно быть не более 50 символов!");
        document.form.SurName.focus();
        return false;
    }

    let firstName = document.form.FirstName.value;
    if (firstName === "") {
        alert("Поле \"Имя\" обязательно для заполнения!");
        document.form.FirstName.focus();
        return false;
    }
    if (firstName.length > 50) {
        alert("Поле \"Имя\" должно быть не более 50 символов!");
        document.form.FirstName.focus();
        return false;
    }

    let patronymic = document.form.Patronymic.value;
    if (patronymic != "" && patronymic.length > 50) {
        alert("Поле \"Отчество\" должно быть не более 50 символов!");
        document.form.Patronymic.focus();
        return false;
    }

    let dateOfBirth = document.form.DateOfBirth.value;
    if (dateOfBirth === "") {
        alert("Поле \"Дата рождения\" обязательно для заполнения!");
        document.form.DateOfBirth.focus();
        return false;
    }

    let docSeries = document.form.DocSeries.value;
    if (docSeries != "" && docSeries.length > 4) {
        alert("Поле \"Серия документа\" должно быть не более 4 символов!");
        document.form.DocSeries.focus();
        return false;
    }

    let docNumber = document.form.DocNumber.value;
    if (docNumber != "" && docNumber.length > 6) {
        alert("Поле \"Номер документа\" должно быть не более 6 символов!");
        document.form.DocNumber.focus();
        return false;
    }

    let postition = document.form.Position.value;
    if (postition == "") {
        alert("Поле \"Должность\" обязательно для заполнения!");
        document.form.Position.focus();
        return false;
    }
    if (postition != "" && postition.length > 50) {
        alert("Поле \"Должность\" должно быть не более 50 символов!");
        document.form.Position.focus();
        return false;
    }

    return true;
}