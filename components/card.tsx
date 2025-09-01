import { ingredients } from "@/app/(dashboard)/recipes/[id]/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: string;
  extendedIngredients: ingredients[];
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative">
        <Link href={`/recipes/${recipe.id}`}>
          <Image
            src={recipe.image}
            alt="A delicious meal"
            width={600}
            height={400}
            className="object-cover h-full w-full"
          />
        </Link>
      </div>
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>
          {recipe.summary &&
            recipe.summary.replace(/<[^>]+>/g, "").slice(0, 100) + "..."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* You can add more content here, such as ingredients or prep time */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Cook Time: {recipe.readyInMinutes} minutes</span>
        </div>
      </CardContent>
      <CardFooter className="mb-4">
        <Button className="w-full">Save to Favorites</Button>
      </CardFooter>
    </Card>
  );
}
