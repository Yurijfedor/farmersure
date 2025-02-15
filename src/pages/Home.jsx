import { StreamViewer } from "../components/streamViewer/StreamViewer";

const Home = () => {
  return (
    <div>
      <h1>Ласкаво просимо на платформу!</h1>
      <p>
        Тут ви можете переглядати відео з вулика та отримати корисну інформацію
        про бджільництво.
      </p>

      <h2>📹 Прямий ефір з вулика</h2>
      <StreamViewer />

      <h2>🐝 Що ми пропонуємо?</h2>
      <p>Оренда вуликів, продаж продукції та навчання для пасічників.</p>
    </div>
  );
};

export default Home;
