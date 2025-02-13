import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CircleCheck } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import useImageUpload from '@/hooks/useImageUpload';
import { CampaignCard } from '@/components/CampaignCard';
import Loading from '@/components/Loading';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageURI: z.string().url('Invalid URL'),
  goal: z.string().regex(/^\d+(\.\d+)?$/, 'Goal must be a valid number'),
  endsAt: z.date().refine(date => date > new Date(), 'End date must be in the future')
});

const CreateCampaign = () => {
  
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      imageURI: ''
    }
  });
  const { uploadImage, uploading, error, imageUrl } = useImageUpload();
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (imageUrl) {
      form.setValue('imageURI', imageUrl);
    }
  }, [imageUrl]);

  const onSubmit = async (data) => {
    data.imageURI = form.getValues('imageURI');
    data.goal = Number(data.goal); // Ensure goal is a number
    data.endsAt = Math.floor(new Date(data.endsAt).getTime() / 1000); // Convert to Unix timestamp
    console.log(data);
  };

  const handleFileChange = async(e) => {
    try {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      await uploadImage(file).then((res) => {
        console.log(res);
        if(res.status === 200) {
          form.setValue('imageURI', res.data.data.url);
          toast({
            title: (
              <div className="flex items-center gap-1">
                <CircleCheck className="text-teal-500" /> Image Uploaded
              </div>
            ),
          });
        } else {
          toast({
            title: "Uh oh!",
            description: "Failed to upload image, please try again later",
            variant: "destructive",
          });
        }
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Uh oh!",
        description: "Failed to upload image, please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="box py-28 grid lg:grid-cols-5 grid-cols-1 gap-6">
      <div className="lg:col-span-3 col-span-1">
        <div className='mb-5'>
          <h1 className="text-3xl font-bold">Campaign List</h1>
          <p className="text-sm text-gray-500 mt-2">
            Let's start contributing to the campaigns.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Campaign Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Campaign Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormField
                className=""
                control={form.control}
                name="imageURI"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {uploading ? (
                        <><Loading /> Uploading...</>
                      ) : 'Image Thumbnail'}
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input placeholder="Image URL" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input id="picture" type="file" onChange={handleFileChange} />
            </div>
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endsAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <><Loading /> Submitting...</>
              ) : 'Submit'}
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </form>
        </Form>
      </div>
      <div className="lg:col-span-2 col-span-1">
        <div className='mb-5'>
          <h1 className="text-3xl font-bold">Preview</h1>
          <p className="text-sm text-gray-500 mt-2">
            Preview of the campaign you are creating.
          </p>
        </div>
        <CampaignCard campaign={{
          title: form.watch('title') || 'Untitled',
          imageURI: previewImage || 'https://images.unsplash.com/photo-1636390785299-b4df455163dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          totalContributions: 0,
          goal: form.watch('goal') || 0,
          endsAt: form.watch('endsAt') ? Math.floor(new Date(form.watch('endsAt')).getTime() / 1000) : 2398352399,
        }} to="#"/>
      </div>
    </div>
  );
};

export default CreateCampaign;