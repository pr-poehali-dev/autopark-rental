import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import CarCard from '@/components/CarCard';
import FilterSection, { FilterState } from '@/components/FilterSection';
import SearchBar from '@/components/SearchBar';

const carsData = [
  {
    id: 1,
    name: 'Toyota Camry',
    type: 'Седан',
    price: 3500,
    image: '/placeholder.svg',
    features: ['Кондиционер', 'Bluetooth', 'Круиз-контроль'],
    transmission: 'Автомат',
    passengers: 5
  },
  {
    id: 2,
    name: 'BMW X5',
    type: 'Внедорожник',
    price: 8500,
    image: '/placeholder.svg',
    features: ['Панорама', 'Навигация', 'Кожаный салон'],
    transmission: 'Автомат',
    passengers: 7
  },
  {
    id: 3,
    name: 'Porsche 911',
    type: 'Спорткар',
    price: 15000,
    image: '/placeholder.svg',
    features: ['Спортивная подвеска', 'Premium аудио', 'Карбон'],
    transmission: 'Автомат',
    passengers: 2
  },
  {
    id: 4,
    name: 'Hyundai Solaris',
    type: 'Эконом',
    price: 2000,
    image: '/placeholder.svg',
    features: ['Кондиционер', 'USB', 'AUX'],
    transmission: 'Механика',
    passengers: 5
  },
  {
    id: 5,
    name: 'Mercedes-Benz S-Class',
    type: 'Седан',
    price: 12000,
    image: '/placeholder.svg',
    features: ['Массаж сидений', 'Премиум звук', 'Ночное видение'],
    transmission: 'Автомат',
    passengers: 5
  },
  {
    id: 6,
    name: 'Volkswagen Tiguan',
    type: 'Внедорожник',
    price: 4500,
    image: '/placeholder.svg',
    features: ['Полный привод', 'Парктроник', 'Камера'],
    transmission: 'Автомат',
    passengers: 5
  }
];

export default function Index() {
  const [filteredCars, setFilteredCars] = useState(carsData);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...carsData];

    if (filters.type !== 'all') {
      const typeMap: Record<string, string> = {
        sedan: 'Седан',
        suv: 'Внедорожник',
        sports: 'Спорткар',
        economy: 'Эконом'
      };
      filtered = filtered.filter(car => car.type === typeMap[filters.type]);
    }

    filtered = filtered.filter(
      car => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    if (filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-card border-b sticky top-0 z-50 backdrop-blur-lg bg-background/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Car" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">АвтоПрокат</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#home" className="hover:text-primary transition-colors font-semibold">Главная</a>
              <a href="#catalog" className="hover:text-primary transition-colors font-semibold">Каталог</a>
              <a href="#about" className="hover:text-primary transition-colors font-semibold">О нас</a>
              <a href="#terms" className="hover:text-primary transition-colors font-semibold">Условия</a>
              <a href="#contacts" className="hover:text-primary transition-colors font-semibold">Контакты</a>
              <a href="#faq" className="hover:text-primary transition-colors font-semibold">FAQ</a>
            </div>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Аренда автомобилей премиум-класса
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Широкий выбор автомобилей с доставкой в любую точку города. Гибкие условия и выгодные цены!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8 h-14 bg-primary hover:bg-primary/90">
                <Icon name="Car" size={20} className="mr-2" />
                Выбрать авто
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить нам
              </Button>
            </div>
          </div>
          
          <div className="animate-slide-up">
            <SearchBar />
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наш автопарк</h2>
            <p className="text-lg text-muted-foreground">Выберите идеальный автомобиль для ваших нужд</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSection onFilterChange={handleFilterChange} />
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} {...car} />
                ))}
              </div>
              {filteredCars.length === 0 && (
                <div className="text-center py-20">
                  <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-xl text-muted-foreground">Автомобили не найдены. Попробуйте изменить фильтры.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Удобная доставка и возврат</h2>
            <p className="text-lg text-muted-foreground">Мы привезём и заберём автомобиль в удобное для вас место</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Доставка по адресу</h3>
              <p className="text-muted-foreground">Привезём автомобиль к вашему дому или офису</p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Гибкий график</h3>
              <p className="text-muted-foreground">Выберите удобное время получения и возврата</p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Полная страховка</h3>
              <p className="text-muted-foreground">Все автомобили застрахованы по КАСКО и ОСАГО</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">О нашей компании</h2>
              <p className="text-lg text-muted-foreground mb-6">
                АвтоПрокат — ведущая компания по аренде автомобилей с более чем 10-летним опытом работы на рынке. 
                Мы предлагаем широкий выбор автомобилей различных классов по доступным ценам.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Наша миссия — сделать автомобильную мобильность доступной каждому. Мы постоянно обновляем автопарк 
                и следим за качеством обслуживания.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-primary/5 rounded-xl">
                  <p className="text-4xl font-bold text-primary mb-2">500+</p>
                  <p className="text-sm text-muted-foreground">Автомобилей в парке</p>
                </div>
                <div className="text-center p-6 bg-accent/5 rounded-xl">
                  <p className="text-4xl font-bold text-accent mb-2">15K+</p>
                  <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Icon name="Car" size={200} className="text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="terms" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Условия аренды</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card p-6 rounded-xl border">
              <Icon name="IdCard" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Требования к водителю</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Возраст от 21 года</li>
                <li>• Стаж вождения от 2 лет</li>
                <li>• Наличие действующих прав</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border">
              <Icon name="FileText" size={32} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Необходимые документы</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Паспорт РФ</li>
                <li>• Водительское удостоверение</li>
                <li>• Залог или банковская карта</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border">
              <Icon name="CreditCard" size={32} className="text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Оплата</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Наличные</li>
                <li>• Банковские карты</li>
                <li>• Безналичный расчёт</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border">
              <Icon name="Shield" size={32} className="text-accent mb-4" />
              <h3 className="text-xl font-bold mb-3">Страхование</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• КАСКО включено</li>
                <li>• ОСАГО включено</li>
                <li>• Франшиза 15 000₽</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Часто задаваемые вопросы</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Как забронировать автомобиль?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Вы можете забронировать автомобиль через сайт, по телефону или посетив наш офис. 
                Для бронирования необходимо указать даты аренды и предоставить копию документов.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли арендовать авто с доставкой?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, мы предоставляем услугу доставки автомобиля по указанному адресу. 
                Стоимость доставки зависит от района и составляет от 500₽.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Какой залог требуется?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Размер залога зависит от класса автомобиля и составляет от 5 000₽ до 50 000₽. 
                Залог можно внести наличными или мы заблокируем сумму на вашей карте.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Что делать в случае ДТП?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                В случае ДТП необходимо немедленно связаться с нами и вызвать ГИБДД. 
                Все автомобили застрахованы по КАСКО, поэтому ущерб будет покрыт страховкой.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли продлить аренду?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, аренду можно продлить, позвонив нам заранее. Продление возможно при наличии 
                свободного автомобиля на требуемые даты.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Свяжитесь с нами</h2>
            <p className="text-xl mb-12 opacity-90">Мы всегда рады ответить на ваши вопросы</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
                <Icon name="Phone" size={32} className="mx-auto mb-4" />
                <h3 className="font-bold mb-2">Телефон</h3>
                <p>+7 (999) 123-45-67</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
                <Icon name="Mail" size={32} className="mx-auto mb-4" />
                <h3 className="font-bold mb-2">Email</h3>
                <p>info@avtoprokat.ru</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
                <Icon name="MapPin" size={32} className="mx-auto mb-4" />
                <h3 className="font-bold mb-2">Адрес</h3>
                <p>г. Москва, ул. Примерная, 1</p>
              </div>
            </div>

            <div className="text-center">
              <p className="opacity-90 mb-4">Работаем ежедневно с 8:00 до 22:00</p>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Написать в WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 АвтоПрокат. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
