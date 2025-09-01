"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getRecipeInfo } from "@/lib/api";
import { Recipe } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

export type ingredients = {
  name: string;
};

interface RecipeDetailsProps {
  recipe: {
    title: string;
    summary: string;
    image: string;
    cookTime: string;
    servings: number;
    extendedIngredients: ingredients[];
    instructions: string[];
  };
}

export default function RecipeDetails({}: RecipeDetailsProps) {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getRecipeInfo(id).then(({ recipes }) => {
      console.log("Information", recipes);
      setRecipe(recipes);
    });
  }, [id]);

  return (
    <>
      <div className="flex">
        <div className="">
          <Button
            variant="secondary"
            size="icon"
            className="size-8"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon />
            Back
          </Button>
        </div>
      </div>
      <div className="container mx-auto max-w-3xl py-4">
        {recipe && (
          <Card className="overflow-hidden shadow-md p-0">
            {/* Recipe Image */}
            <div className="relative h-64 w-full">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Recipe Info */}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {recipe.title}
              </CardTitle>
              <CardDescription
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              ></CardDescription>
              <div className="mt-2 flex gap-3">
                <Badge variant="secondary">⏱ {recipe.readyInMinutes}</Badge>
                <Badge variant="outline">🍽 Serves {recipe.servings}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Ingredients */}
              <section>
                <h2 className="mb-2 text-lg font-semibold">Ingredients</h2>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.extendedIngredients.map((item, idx) => (
                    <li key={idx}>{item.name}</li>
                  ))}
                </ul>
              </section>

              {/* Instructions */}
              <section>
                {/* <h2 className="mb-2 text-lg font-semibold">Instructions</h2> */}
                {/* <Accordion type="single" collapsible className="w-full">
              {recipe.instructions.map((step, idx) => (
                <AccordionItem key={idx} value={`step-${idx}`}>
                  <AccordionTrigger>Step {idx + 1}</AccordionTrigger>
                  <AccordionContent>{step}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion> */}
              </section>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
