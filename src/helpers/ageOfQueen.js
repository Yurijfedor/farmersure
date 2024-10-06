export const ageOfQueen = (dateOfBirthd) => {
  const today = new Date(); // Поточна дата
  const birthDate = new Date(dateOfBirthd); // Дата народження

  // Обчислюємо різницю в роках і місяцях
  const yearsDiff = today.getFullYear() - birthDate.getFullYear();
  const monthsDiff = today.getMonth() - birthDate.getMonth();

  // Загальна кількість місяців з урахуванням років і місяців
  let ageInMonths = yearsDiff * 12 + monthsDiff;

  // Якщо день народження ще не настав цього місяця, зменшуємо на 1 місяць
  if (today.getDate() < birthDate.getDate()) {
    ageInMonths--;
  }

  return ageInMonths;
};
