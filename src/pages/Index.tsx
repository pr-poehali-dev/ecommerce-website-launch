import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: string[];
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'SmartPhone Pro X',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/1e37b867-6b0b-4b39-9c69-9505f9993726/files/6749fc8a-f58b-4a63-9b18-e853a0a0ba03.jpg',
    category: 'Смартфоны',
    specs: ['6.7" OLED', '256GB', '5G', '48MP'],
    badge: 'Хит продаж'
  },
  {
    id: 2,
    name: 'AirPods Ultra',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/1e37b867-6b0b-4b39-9c69-9505f9993726/files/6b8eb1b7-0268-4e09-be8e-de3e89d695d8.jpg',
    category: 'Аудио',
    specs: ['ANC', '30ч батарея', 'USB-C', 'IPX4'],
    badge: 'Новинка'
  },
  {
    id: 3,
    name: 'Watch Series 9',
    price: 44990,
    image: 'https://cdn.poehali.dev/projects/1e37b867-6b0b-4b39-9c69-9505f9993726/files/83b87578-13e6-4760-becd-cb754e6d9bd9.jpg',
    category: 'Умные часы',
    specs: ['AMOLED', 'GPS', 'NFC', 'Титан']
  },
  {
    id: 4,
    name: 'Tablet Air 12',
    price: 64990,
    image: 'https://cdn.poehali.dev/projects/1e37b867-6b0b-4b39-9c69-9505f9993726/files/6749fc8a-f58b-4a63-9b18-e853a0a0ba03.jpg',
    category: 'Планшеты',
    specs: ['12.9" Retina', '512GB', 'M2 чип', 'Pencil']
  },
  {
    id: 5,
    name: 'Speaker Max',
    price: 14990,
    image: 'https://cdn.poehali.dev/projects/1e37b867-6b0b-4b39-9c69-9505f9993726/files/6b8eb1b7-0268-4e09-be8e-de3e89d695d8.jpg',
    category: 'Аудио',
    specs: ['360° звук', 'Bluetooth 5.3', '20ч', 'IP67']
  },
  {
    id: 6,
    name: 'Camera 4K Pro',
    price: 129990,
    image: 'https://cdn.poehali.dev/projects/1e37b867-6b0b-4b39-9c69-9505f9993726/files/83b87578-13e6-4760-becd-cb754e6d9bd9.jpg',
    category: 'Камеры',
    specs: ['4K 60fps', 'Стабилизация', '128GB', 'WiFi']
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [currentSection, setCurrentSection] = useState<'catalog' | 'checkout' | 'delivery' | 'contacts'>('catalog');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Icon name="Zap" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TechStore
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentSection('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Каталог
            </button>
            <button
              onClick={() => setCurrentSection('delivery')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Доставка и оплата
            </button>
            <button
              onClick={() => setCurrentSection('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Контакты
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Icon name="ShoppingBag" size={64} className="text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
                      {cart.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-20 w-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                                <div className="mt-2 flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto h-8 w-8 text-destructive"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{cartTotal.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setCurrentSection('checkout')}
                      >
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {currentSection === 'catalog' && (
        <>
          <section className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary border-0">
                Новая коллекция 2024
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Технологии будущего
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Откройте для себя премиальные гаджеты с инновационными технологиями
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Icon name="ShoppingBag" size={20} />
                  Каталог
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Icon name="Sparkles" size={20} />
                  Новинки
                </Button>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-0 relative overflow-hidden">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.badge && (
                        <Badge className="absolute top-4 right-4 bg-secondary border-0">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-2">{product.category}</Badge>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.specs.map(spec => (
                        <span key={spec} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full gap-2"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      {currentSection === 'checkout' && (
        <section className="container mx-auto px-4 py-12 max-w-2xl">
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => setCurrentSection('catalog')}>
            <Icon name="ArrowLeft" size={18} />
            Назад к каталогу
          </Button>
          <Card>
            <CardHeader>
              <h2 className="text-3xl font-bold">Оформление заказа</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Контактная информация</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Иван Иванов" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Адрес доставки</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес</Label>
                    <Textarea id="address" placeholder="Улица, дом, квартира" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ваш заказ</h3>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span>{cartTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Подтвердить заказ
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {currentSection === 'delivery' && (
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => setCurrentSection('catalog')}>
            <Icon name="ArrowLeft" size={18} />
            Назад к каталогу
          </Button>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Icon name="Truck" size={32} className="text-primary mb-2" />
                <h3 className="text-2xl font-bold">Доставка</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Курьерская доставка</h4>
                  <p className="text-sm text-muted-foreground">
                    По Москве — бесплатно при заказе от 5000 ₽
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Доставка 1-2 дня
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Пункты выдачи</h4>
                  <p className="text-sm text-muted-foreground">
                    Более 500 пунктов в России
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Доставка 3-5 дней
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="CreditCard" size={32} className="text-primary mb-2" />
                <h3 className="text-2xl font-bold">Оплата</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Банковская карта</h4>
                  <p className="text-sm text-muted-foreground">
                    Visa, MasterCard, МИР
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Наличными курьеру</h4>
                  <p className="text-sm text-muted-foreground">
                    При получении заказа
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Рассрочка</h4>
                  <p className="text-sm text-muted-foreground">
                    0% на 6 месяцев
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {currentSection === 'contacts' && (
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => setCurrentSection('catalog')}>
            <Icon name="ArrowLeft" size={18} />
            Назад к каталогу
          </Button>
          <Card>
            <CardHeader>
              <h2 className="text-3xl font-bold">Контакты</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">Адрес</h4>
                      <p className="text-sm text-muted-foreground">
                        г. Москва, ул. Тверская, д. 1
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">Телефон</h4>
                      <p className="text-sm text-muted-foreground">
                        +7 (495) 123-45-67
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        info@techstore.ru
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">Режим работы</h4>
                      <p className="text-sm text-muted-foreground">
                        Пн-Вс: 9:00 - 21:00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Напишите нам</h3>
                  <div className="space-y-3">
                    <Input placeholder="Ваше имя" />
                    <Input type="email" placeholder="Email" />
                    <Textarea placeholder="Сообщение" rows={4} />
                    <Button className="w-full">Отправить</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Icon name="Zap" className="text-white" size={16} />
              </div>
              <span className="font-bold">TechStore</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TechStore. Все права защищены.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
