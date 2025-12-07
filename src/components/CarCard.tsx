import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CarCardProps {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  features: string[];
  transmission: string;
  passengers: number;
}

const getCarGradient = (type: string) => {
  const gradients: Record<string, string> = {
    'Седан': 'from-blue-500/20 via-cyan-500/20 to-blue-600/20',
    'Внедорожник': 'from-green-500/20 via-emerald-500/20 to-teal-600/20',
    'Спорткар': 'from-red-500/20 via-orange-500/20 to-red-600/20',
    'Эконом': 'from-purple-500/20 via-pink-500/20 to-purple-600/20'
  };
  return gradients[type] || 'from-gray-400/20 to-gray-600/20';
};

export default function CarCard({ name, type, price, image, features, transmission, passengers }: CarCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getCarGradient(type)} flex items-center justify-center`}>
        <Icon 
          name="Car" 
          size={80} 
          className="text-foreground/30 group-hover:scale-110 group-hover:text-foreground/40 transition-all duration-500"
        />
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {type}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Icon name="Users" size={16} />
            <span>{passengers}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Settings" size={16} />
            <span>{transmission}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div>
            <p className="text-2xl font-bold text-primary">{price}₽</p>
            <p className="text-xs text-muted-foreground">за день</p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Забронировать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}