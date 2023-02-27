

//заполнение первоначальных данных подразделения
function SetInitialInfoDepartmentCard() {
    //выбор из списка отделов того к которому относится подразделение
    let parentDepartment = document.getElementById("selectedDep");
    let departmentList = document.getElementById("departmentList");
    for (let i = 0; i < departmentList.length; i++) {
        if (departmentList[i].value === parentDepartment.value) {
            departmentList.selectedIndex = i;
            break;
        }
    }
}

//заполнение первоначальных данных сотрудника
function SetInitialInfoEmployeeCard() {
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
    //JS не работает с датами разделенных ".", поэтому их необходимо преобразовать
    let dateOfBirth = document.getElementById("dateOfBirth").value;
    //let dateParts = dateOfBirth.split(".");
    //dateOfBirth = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
    let ageInMs = new Date() - new Date(dateOfBirth);
    let ageDate = new Date(ageInMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    document.getElementById("EmployeeAge").innerHTML = isNaN(age) ? "0" : String(age);
}

//Проверка заполненности обязательных полей
function ValidateEmployee() {
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
    if (postition === "") {
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

function ValidateDepartment() {
    let code = document.form.Code.value;
    if (code != "" && code.length > 10) {
        alert("Поле \"Мнемокод\" должно быть не более 10 символов");
        document.forms.Code.focus();
        return false;
    }

    let name = document.form.Name.value;
    if (name === "") {
        alert("Поле \"Наименование\" обязательно для заполнения");
        document.forms.Name.focus();
        return false;
    }
    if (name != "" && name.length > 50) {
        alert("Поле \"Наименование\" должно быть не более 50 символов");
        document.forms.Name.focus();
        return false;
    }

    return true;
}

function ConfirmDeletingEmployee(employeeID) {
    if (!confirm("Вы действительно хотите удалить сотрудника?")) {
        return false;
    }
    ChangeSelectedEmployee(employeeID);
    return true;
}


function ConfirmDeletingDepartment() {
    return confirm("Вы действительно хотите удалить отдел? (Отделы в которых есть дочерние отделы или сотрудники не будут удалены)")
}


function ChangeSelectedEmployee(employeeID) {
    document.getElementById("selectedEmp").value = employeeID;
}


function ChangeSelectedDepartment(element) {
    document.getElementById("selectedDep").value = element.value;
}