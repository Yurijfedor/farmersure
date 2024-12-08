export const beekeepingTasks = [
  {
    month: ["березень"],
    name: "Весняна ревізія",
    purpose: [],
    description:
      "Огляд вулика на предмет життєздатності бджолосім'ї, виявлення можливих захворювань або загроз, і оцінка потреби в підгодівлі.",
    duration: 15, // хвилин
    costPerHour: 15,
    priority: "обов'язкова",
    frequency: {
      березень: 1,
    },
  },
  {
    month: [
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
      "листопад",
    ],
    name: "Плановий огляд стану бджолосім'ї",
    purpose: [],
    description:
      "Оцінка стану сім'ї, кількість бджіл, наявність матки, контроль ройового стану, кількість корму, можливі захворювання.",
    duration: 10,
    costPerHour: 15,
    priority: "обов'язкова",
    frequency: {
      березень: 2,
      квітень: 2,
      травень: 4,
      червень: 4,
      липень: 4,
      серпень: 2,
      вересень: 2,
      жовтень: 2,
      листопад: 2,
    },
  },
  {
    month: ["лютий", "березень"],
    name: "Підгодівля канді",
    purpose: [],
    description:
      "Подача цукрової пасти (канді) для підгодівлі бджіл у зимово-весняний період.",
    duration: 5,
    costPerHour: 10,
    priority: "необов'язкова",
  },
  {
    month: ["березень", "квітень", "серпень", "вересень"],
    name: "Підгодівля сиропом",
    purpose: [],
    description:
      "Підгодівля бджіл цукровим сиропом для підтримки сили сім'ї або підготовки до зими.",
    duration: 5,
    costPerHour: 10,
    priority: "необов'язкова",
  },
  {
    month: ["березень", "квітень", "травень"],
    name: "Розширення сушю",
    purpose: [],
    description:
      "Додавання суші для збільшення об'єму вулика і розширення медових рамок.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень"],
    name: "Розширення вощиною",
    purpose: [],
    description:
      "Додавання вощини для розширення гнізда і стимуляції бджолиних робіт.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень"],
    name: "Розширення трутневою вощиною",
    purpose: [],
    description:
      "Додавання трутневої вощини для регулювання популяції трутнів і як метод боротьби з кліщами.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["березень", "вересень", "жовтень"],
    name: "Обробіток від кліща Варроа",
    purpose: [],
    description:
      "Хімічний або природний обробіток вулика для знищення кліщів Варроа.",
    duration: 10,
    costPerHour: 15,
    priority: "обов'язкова",
  },
  {
    month: [
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
    ],
    name: "Заміна матки",
    purpose: [],
    description:
      "Заміна старої або дефективної матки для поліпшення розвитку бджолосім'ї.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: [
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
    ],
    name: "Підсадка матки",
    purpose: [],
    description:
      "Процедура введення нової матки в сім'ю для покращення її продуктивності.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: [
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
    ],
    name: "Мічення матки",
    purpose: [],
    description:
      "Мітка на матці для легкого визначення її у вулику під час оглядів.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: [
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
    ],
    name: "Посадка матки в кліточку",
    purpose: [],
    description:
      "Посадка матки у кліточку для забезпечення безпечного введення в сім'ю.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень", "липень", "серпень", "грудень"],
    name: "Збір прополісу",
    purpose: ["propolis"],
    description:
      "Збір прополісу, який бджоли використовують для герметизації та знезараження вулика.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
    frequency: {
      грудень: 1,
      червень: 2,
    },
  },
  {
    month: ["квітень", "травень", "червень", "липень", "серпень", "грудень"],
    name: "Збір пилку",
    purpose: ["pollen"],
    description:
      "Збір пилку, який використовується для підгодівлі бджіл і комерційного продажу.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
    frequency: {
      грудень: 1,
      червень: 2,
    },
  },
  {
    month: ["квітень", "травень", "червень"],
    name: "Постановка прививочних рамок",
    purpose: ["royalJelly"],
    description:
      "Додавання прививочних рамок для стимуляції бджіл на вирощування нових маток.",
    duration: 10,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень"],
    name: "Прищеплення личинок",
    purpose: ["royalJelly"],
    description:
      "Прищеплення личинок для формування нових маток та розвитку нових сімей.",
    duration: 20,
    costPerHour: 20,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень"],
    name: "Збір маточного молочка",
    purpose: ["royalJelly"],
    description:
      "Збір маточного молочка, яке використовується для підвищення продуктивності матки та комерційних цілей.",
    duration: 20,
    costPerHour: 20,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень"],
    name: "Формування відводків",
    purpose: [],
    description:
      "Формування відводків для створення нових бджолосімей або їх подальшого продажу.",
    duration: 30,
    costPerHour: 25,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень"],
    name: "Збір трутневого гомогенату",
    purpose: ["droneHomogenate"],
    description:
      "Збір трутневого гомогенату, який використовується в медицині і косметології.",
    duration: 20,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["березень"],
    name: "Збір бджолиного підмору",
    purpose: [],
    description: "Збір бджолиного підмору для виготовлення настоянок і ліків.",
    duration: 20,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень", "липень"],
    name: "Збір бджолиного яду",
    purpose: ["beeVenom"],
    description:
      "Збір бджолиного яду, який використовується в медицині та косметології.",
    duration: 20,
    costPerHour: 20,
    priority: "необов'язкова",
  },
  {
    month: ["квітень", "травень", "червень", "липень"],
    name: "Вирізання маточників",
    purpose: [],
    description:
      "Вирізання маточників для запобігання роїнню або контролю якості маток.",
    duration: 15,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["травень", "червень", "липень", "серпень"],
    name: "Відбір медових рамок",
    purpose: ["honey"],
    description: "Відбір рамок з медом для їх подальшої відкачки.",
    duration: 15,
    costPerHour: 15,
    priority: "необов'язкова",
  },
  {
    month: ["травень", "червень", "липень", "серпень"],
    name: "Відкачка меду",
    purpose: ["honey"],
    description: "Відкачка меду з рамок за допомогою медогонки.",
    duration: 30,
    costPerHour: 10,
    priority: "необов'язкова",
  },
  {
    month: [
      "березень",
      "квітень",
      "травень",
      "червень",
      "липень",
      "серпень",
      "вересень",
      "жовтень",
    ],
    name: "Перетоплювання воску",
    purpose: ["wax"],
    description:
      "Перетоплювання старого воску для виготовлення нових воскових листів.",
    duration: 15,
    costPerHour: 10,
    priority: "необов'язкова",
  },
];
