
fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json")
    .then(function (response) {

        let jsonResponse = response.text()
        return jsonResponse
    })
    .then(function (result) {
        
        // All students
        let students = JSON.parse(result)
        console.log(students)

        // Task 1: All students with an average grade higher than 3
        const task1 = students.filter((element) => element.averageGrade > 3)
        console.log(`----- TASK 1 -----`)
        console.log(task1)

        // Task 2: All female student names with an average grade of 5
        const task2 = students.filter((element) => element.gender === "Female" && element.averageGrade === 5)
        console.log(`----- TASK 2 -----`)
        task2.forEach((e) => console.log(e.firstName))

        // Task 3: All male student full names who live in Skopje and are over 18 years old 
        let task3 = students.filter((e) => e.gender === "Male" && e.city === "Skopje" && e.age > 18)
        console.log(`----- TASK 3 -----`)
        task3 = task3.forEach((e) => console.log(`${e.firstName} ${e.lastName}`))

        // Task 4: The average grades of all female students over the age of 24
        let task4 = students.filter((e) => e.gender === "Female" && e.age > 24)
        let avg = task4 = task4.map((task4) => task4.averageGrade)
        avg = avg.reduce((sum, grade) => sum += grade, 0);
        avg = avg / task4.length;
        console.log(`----- TASK 4 -----`)
        console.log(avg)

        // Task 5: All male students with a name starting with B and average grade over 2
        let task5 = students.filter((e) => e.gender === "Male" && e.firstName.charAt(0) === "B")
        console.log(`----- TASK 5 -----`)
        console.log(task5)
    })


