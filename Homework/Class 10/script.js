// EXERCISE 2

function Institution(location, capacity) {
    this.id = Math.random(),
    this.location = location,
    this.capacity = capacity,

    this.validateCapacity = () => {
        if (this.capacity < 1) {
            console.log(`Error`)
        }
    }
}

function Course(description, price) {
    this.id = Math.random(),
    this.description = description,
    this.price = price,

    this.validatePrice = () => {
        if (this.price < 0) {
            console.log(`Error`)
        }
    }
}

function Person(email, phone){
    this.id = Math.random(),
    this.email = email,
    this.phone = phone,

    this.validateEmail = () => {
        let validation = /[@]/
        if(validation.test(email) !== true){
            console.log(`Error`)
        }
    }
}
// EXERCISE 1 

const arrayOfStudents = []
const arrayOfSubjects = []

function Academy(name, students, subjects, location, capacity) {

    Object.setPrototypeOf(this, new Institution(location, capacity))
    this.name = name,
    this.students = students,
    this.subjects = subjects,
    this.start = new Date("10.10.2024 17:30"),
    this.end = new Date("10.10.2025 20:45"),
    this.numberOfClasses = this.subjects.length * 10,

    this.printStudents = () => students.forEach((e) => console.log(`${e.firstName} ${e.lastName}`))
    this.printSubjects = () => subjects.forEach((e) => console.log(`${e.title}`))
}

function Subjects(title, isElective, overwrite, academyObject, students, description, price) {

    Object.setPrototypeOf(this, new Course(description, price))
    this.title = title,
    this.numberOfClasses = 10,
    this.isElective = isElective,
    this.Academy = academyObject,
    this.students = students,

    this.overwriteClasses = () => {
        if (overwrite < 3) {
            console.log(`The minimum number of classes must be 3`)
        }
        if (overwrite >= 3) {
            this.numberOfClasses = overwrite
            console.log(`Now the number of classes is ${this.numberOfClasses}`)
        }
    }
}

function Student(firstName, lastName, age, academyObject, subjectObject, email, phone) {

    Object.setPrototypeOf(this, new Person (email, phone))
    this.firstName = firstName,
    this.lastName = lastName,
    this.age = age,
    this.completedSubjects = [],
    this.academy = null,
    this.currentSubject = null,

    this.startAcademy = () => {
        this.academy = academyObject
    }
    this.startSubject = () => {
        if (this.academy !== null & arrayOfSubjects.includes(subjectObject)) {
            this.currentSubject = subjectObject
        }
        else
            console.log(`Error`)
    }
}

// Testing..

// const academy1 = new Academy('Qinshift', arrayOfStudents, arrayOfSubjects, 'Skopje', 0)

// const subject1 = new Subjects('JS Basic', false, 2, academy1, arrayOfStudents, 'Web Development', 2500)
// arrayOfSubjects.push(subject1)

// const student1 = new Student('Tom', 'Thompson', 23, academy1, subject1, 'tom@gmail.com', '+389xx xxx xxx')
// arrayOfStudents.push(student1)

// const subject2 = new Subjects('JS Advanced', true, 8, academy1, arrayOfStudents, 'Web Development', -2500)
// arrayOfSubjects.push(subject2)

// const student2 = new Student('Sarah', 'Jules', 21, academy1, subject2, 'sarah#gmail.com', '+389xx xxx xxx')
// arrayOfStudents.push(student2)

// academy1.printStudents()
// academy1.printSubjects()
// academy1.validateCapacity()

// subject1.overwriteClasses()
// subject1.validatePrice()

// subject2.overwriteClasses()
// subject2.validatePrice()

// student1.startAcademy()
// student1.startSubject()
// student1.validateEmail()

// student2.startAcademy()
// student2.startSubject()
// student2.validateEmail()



