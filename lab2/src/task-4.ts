export {};

// 4.1. Абстрактний клас BaseNotifier
abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  abstract send(to: string, subject: string, body: string): void;

  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано`);
    console.log("-----------------------------------");
  }
}

//4.2
class EmailNotifier extends BaseNotifier {
  constructor(private readonly smtpServer: string) {
    // Викликаємо конструктор
    super("Email");
  }

  // Реалізація надсилання
  send(to: string, subject: string, body: string): void {
    const preview = body.length > 50 ? body.substring(0, 50) + "..." : body;
    console.log(`📧 Email → ${to}: "${subject}" | Тіло: ${preview} через ${this.smtpServer}`);
  }
}

class SmsNotifier extends BaseNotifier {
  constructor(private readonly phonePrefix: string = "+380") {
    super("SMS");
  }

  send(to: string, subject: string, body: string): void {
    const shortBody = body.substring(0, 160);
    console.log(`📱 SMS → ${this.phonePrefix}${to}: "${shortBody}"`);
  }
}

function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void {
  notifiers.forEach(notifier => {
    notifier.notify(to, subject, body);
  });
}

console.log("=== Завдання 4- ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(), //префікс +380
];

sendBulkNotification(
  notifiers,
  "991234567", // для Email це буде некоректно
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025. Будь ласка, ознайомтеся з технічним завданням у Jira."
);