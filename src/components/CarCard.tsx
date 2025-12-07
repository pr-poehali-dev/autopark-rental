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

export default function CarCard({ name, type, price, image, features, transmission, passengers }: CarCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
