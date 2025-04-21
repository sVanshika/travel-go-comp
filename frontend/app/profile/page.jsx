"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChatBubbleIcon } from "@/components/chat-bubble-icon";
import {
  Check,
  ChevronsUpDown,
  Upload,
  X,
  Plus,
  Calendar,
  DollarSign,
  MapPin,
  Compass,
  Save,
  Edit,
  AlertCircle,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProfilePage() {
  // State to track if profile has been filled
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const [isPreferencesFilled, setIsPreferencesFilled] = useState(false);

  // Mock user data - starting with empty values
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    avatar: "",
  });

  // Travel preferences - starting with empty values
  const [preferences, setPreferences] = useState({
    activities: [],
    budget: "",
    favoriteDestinations: [],
    preferredTravelMonths: [],
  });

  // Edit mode state - start in edit mode if profile is not filled
  const [editMode, setEditMode] = useState(true);
  const [editPreferencesMode, setEditPreferencesMode] = useState(true);

  // Available options for preferences
  const activityOptions = [
    "Adventure",
    "Beach",
    "City",
    "Cultural",
    "Food",
    "Historical",
    "Nature",
    "Nightlife",
    "Relaxation",
    "Shopping",
    "Spiritual",
    "Wildlife",
  ];

  const budgetOptions = [
    "Budget (Under ₹25,000)",
    "Economy (₹25,000 - ₹50,000)",
    "Moderate (₹50,000 - ₹100,000)",
    "Luxury (₹100,000 - ₹200,000)",
    "Ultra-Luxury (Above ₹200,000)",
  ];

  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // State for destination input
  const [destinationInput, setDestinationInput] = useState("");

  // Check if profile data is valid
  const isProfileValid = () => {
    return user.name.trim() !== "" && user.email.trim() !== "";
  };

  // Check if preferences data is valid
  const isPreferencesValid = () => {
    return preferences.activities.length > 0 && preferences.budget !== "";
  };

  // Handle profile update
  const handleProfileUpdate = () => {
    if (!isProfileValid()) {
      alert("Please fill in at least your name and email.");
      return;
    }

    // In a real app, this would call an API to update the user profile
    setEditMode(false);
    setIsProfileFilled(true);
    alert("Profile updated successfully!");
  };

  // Handle preferences update
  const handlePreferencesUpdate = () => {
    if (!isPreferencesValid()) {
      alert("Please select at least one activity and a budget preference.");
      return;
    }

    // In a real app, this would call an API to update the user preferences
    setEditPreferencesMode(false);
    setIsPreferencesFilled(true);
    alert("Preferences updated successfully!");
  };

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setUser({ ...user, avatar: url });
    }
  };

  // Add a new favorite destination
  const addDestination = () => {
    if (
      destinationInput &&
      !preferences.favoriteDestinations.includes(destinationInput)
    ) {
      setPreferences({
        ...preferences,
        favoriteDestinations: [
          ...preferences.favoriteDestinations,
          destinationInput,
        ],
      });
      setDestinationInput("");
    }
  };

  // Remove a favorite destination
  const removeDestination = (destination) => {
    setPreferences({
      ...preferences,
      favoriteDestinations: preferences.favoriteDestinations.filter(
        (d) => d !== destination
      ),
    });
  };

  // Toggle an activity preference
  const toggleActivity = (activity) => {
    if (preferences.activities.includes(activity)) {
      setPreferences({
        ...preferences,
        activities: preferences.activities.filter((a) => a !== activity),
      });
    } else {
      setPreferences({
        ...preferences,
        activities: [...preferences.activities, activity],
      });
    }
  };

  // Toggle a preferred travel month
  const toggleMonth = (month) => {
    if (preferences.preferredTravelMonths.includes(month)) {
      setPreferences({
        ...preferences,
        preferredTravelMonths: preferences.preferredTravelMonths.filter(
          (m) => m !== month
        ),
      });
    } else {
      setPreferences({
        ...preferences,
        preferredTravelMonths: [...preferences.preferredTravelMonths, month],
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Your Profile
            </span>
          </h1>

          {!isProfileFilled && !isPreferencesFilled && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Welcome to TravelGo!</AlertTitle>
              <AlertDescription>
                Please complete your profile and travel preferences to get
                personalized recommendations.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-8">
            {/* Personal Information Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Your personal details and profile picture
                    </CardDescription>
                  </div>
                  {isProfileFilled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {editMode ? (
                  // Edit mode
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={
                              user.avatar ||
                              "/placeholder.svg?height=96&width=96"
                            }
                            alt={user.name || "User"}
                          />
                          <AvatarFallback>
                            {user.name ? user.name.charAt(0) : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="sr-only">Upload avatar</span>
                          <input
                            id="avatar-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                          />
                        </label>
                      </div>
                      <div className="w-full space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            value={user.name}
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={user.phone}
                            onChange={(e) =>
                              setUser({ ...user, phone: e.target.value })
                            }
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a bit about yourself and your travel interests..."
                        className="min-h-[120px]"
                        value={user.bio}
                        onChange={(e) =>
                          setUser({ ...user, bio: e.target.value })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        This will be displayed on your profile and help us
                        personalize your travel recommendations.
                      </p>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-6">
                    {isProfileFilled ? (
                      <>
                        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                          <Avatar className="h-24 w-24">
                            <AvatarImage
                              src={
                                user.avatar ||
                                "/placeholder.svg?height=96&width=96"
                              }
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="w-full space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Full Name
                              </h3>
                              <p className="text-base">{user.name}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">
                                Email
                              </h3>
                              <p className="text-base">{user.email}</p>
                            </div>
                            {user.phone && (
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">
                                  Phone Number
                                </h3>
                                <p className="text-base">{user.phone}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {user.bio && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                              Bio
                            </h3>
                            <p className="mt-1 text-base">{user.bio}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          Please fill in your profile information.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {editMode && (
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Travel Preferences Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Travel Preferences</CardTitle>
                    <CardDescription>
                      Your travel preferences for better recommendations
                    </CardDescription>
                  </div>
                  {isPreferencesFilled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditPreferencesMode(!editPreferencesMode)
                      }
                    >
                      {editPreferencesMode ? (
                        <>
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {editPreferencesMode ? (
                  // Edit mode
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-primary" />
                        Preferred Activities{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {activityOptions.map((activity) => (
                          <Badge
                            key={activity}
                            variant={
                              preferences.activities.includes(activity)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => toggleActivity(activity)}
                          >
                            {activity}
                            {preferences.activities.includes(activity) && (
                              <Check className="ml-1 h-3 w-3" />
                            )}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Select the types of activities you enjoy during your
                        travels.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        className="flex items-center gap-2"
                        htmlFor="budget"
                      >
                        <DollarSign className="h-4 w-4 text-primary" />
                        Budget Preference{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {preferences.budget || "Select a budget range"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search budget range..." />
                            <CommandList>
                              <CommandEmpty>
                                No budget range found.
                              </CommandEmpty>
                              <CommandGroup>
                                {budgetOptions.map((budget) => (
                                  <CommandItem
                                    key={budget}
                                    value={budget}
                                    onSelect={() => {
                                      setPreferences({
                                        ...preferences,
                                        budget,
                                      });
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        preferences.budget === budget
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {budget}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-muted-foreground">
                        Select your typical budget range for trips to help us
                        suggest suitable options.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Favorite Destinations
                      </Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {preferences.favoriteDestinations.map((destination) => (
                          <Badge
                            key={destination}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {destination}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-destructive"
                              onClick={() => removeDestination(destination)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a destination..."
                          value={destinationInput}
                          onChange={(e) => setDestinationInput(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && addDestination()
                          }
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={addDestination}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Add places you've enjoyed visiting or wish to visit in
                        the future.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Preferred Travel Months
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {monthOptions.map((month) => (
                          <Badge
                            key={month}
                            variant={
                              preferences.preferredTravelMonths.includes(month)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => toggleMonth(month)}
                          >
                            {month}
                            {preferences.preferredTravelMonths.includes(
                              month
                            ) && <Check className="ml-1 h-3 w-3" />}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Select the months you typically prefer to travel.
                      </p>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="space-y-6">
                    {isPreferencesFilled ? (
                      <>
                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Compass className="h-4 w-4 text-primary" />
                            Preferred Activities
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {preferences.activities.map((activity) => (
                              <Badge key={activity}>{activity}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <DollarSign className="h-4 w-4 text-primary" />
                            Budget Preference
                          </h3>
                          <p className="mt-1 text-base">{preferences.budget}</p>
                        </div>

                        {preferences.favoriteDestinations.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <MapPin className="h-4 w-4 text-primary" />
                              Favorite Destinations
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {preferences.favoriteDestinations.map(
                                (destination) => (
                                  <Badge key={destination} variant="secondary">
                                    {destination}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {preferences.preferredTravelMonths.length > 0 && (
                          <div>
                            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <Calendar className="h-4 w-4 text-primary" />
                              Preferred Travel Months
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {preferences.preferredTravelMonths.map(
                                (month) => (
                                  <Badge key={month} variant="outline">
                                    {month}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">
                          Please fill in your travel preferences.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              {editPreferencesMode && (
                <CardFooter>
                  <Button onClick={handlePreferencesUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  );
}
