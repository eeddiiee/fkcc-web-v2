import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LpNavbar5 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-5";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Download, Settings, User, Mail, Search, Heart, Star } from "lucide-react";

export default function ComponentsPage() {
  return (
    <>
      <LpNavbar5 />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">UI Components</h1>
            <p className="text-muted-foreground text-lg">
              프로젝트에서 사용 가능한 UI 컴포넌트들을 한눈에 확인하세요.
            </p>
          </div>

          {/* Buttons Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Buttons</h2>
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>다양한 스타일의 버튼 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Variants</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Sizes</Label>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Search className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>With Icons</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Download className="size-4" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Settings className="size-4" />
                      Settings
                    </Button>
                    <Button variant="ghost">
                      <Heart className="size-4" />
                      Like
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>States</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cards Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is the card content area. You can put any content here.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>With Badge</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">New</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cards can include badges and other components.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>With Action</CardTitle>
                  <CardDescription>Card with action button</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cards can have action buttons in the footer.
                  </p>
                  <Button size="sm" variant="outline">Action</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Badges Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Badges</h2>
            <Card>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
                <CardDescription>상태나 카테고리를 표시하는 배지 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Variants</Label>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>With Icons</Label>
                  <div className="flex flex-wrap gap-3">
                    <Badge>
                      <Star className="size-3" />
                      Featured
                    </Badge>
                    <Badge variant="secondary">
                      <Heart className="size-3" />
                      Favorite
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Form Elements Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Form Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                  <CardDescription>텍스트 입력 필드</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input id="search" type="search" placeholder="Search..." />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Textarea</CardTitle>
                  <CardDescription>여러 줄 텍스트 입력</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Enter your message here..." 
                      rows={5}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Checkbox</CardTitle>
                <CardDescription>선택 옵션 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="cursor-pointer">
                    I agree to the terms and conditions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="cursor-pointer">
                    Subscribe to newsletter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" disabled />
                  <Label htmlFor="marketing" className="cursor-pointer text-muted-foreground">
                    Marketing emails (disabled)
                  </Label>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Avatar Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Avatars</h2>
            <Card>
              <CardHeader>
                <CardTitle>Avatar Component</CardTitle>
                <CardDescription>사용자 프로필 이미지를 표시하는 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Sizes</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-10">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-12">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-16">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fallback (No Image)</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="size-10">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-10">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-10">
                      <AvatarFallback>유</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Dropdown Menu Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Dropdown Menu</h2>
            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>드롭다운 메뉴 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Basic Menu</Label>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 size-4" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 size-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 size-4" />
                          Messages
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Separator Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Separator</h2>
            <Card>
              <CardHeader>
                <CardTitle>Separator</CardTitle>
                <CardDescription>콘텐츠를 구분하는 구분선</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Horizontal</Label>
                  <div className="space-y-4">
                    <div>
                      <p>Content above</p>
                    </div>
                    <Separator />
                    <div>
                      <p>Content below</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Vertical</Label>
                  <div className="flex items-center gap-4 h-10">
                    <span>Left</span>
                    <Separator orientation="vertical" />
                    <span>Right</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Aspect Ratio Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Aspect Ratio</h2>
            <Card>
              <CardHeader>
                <CardTitle>Aspect Ratio</CardTitle>
                <CardDescription>비율을 유지하는 컨테이너 컴포넌트</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>16:9</Label>
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <span className="text-muted-foreground">16:9</span>
                      </div>
                    </AspectRatio>
                  </div>
                  <div className="space-y-2">
                    <Label>4:3</Label>
                    <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <span className="text-muted-foreground">4:3</span>
                      </div>
                    </AspectRatio>
                  </div>
                  <div className="space-y-2">
                    <Label>1:1</Label>
                    <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <span className="text-muted-foreground">1:1</span>
                      </div>
                    </AspectRatio>
                  </div>
                  <div className="space-y-2">
                    <Label>21:9</Label>
                    <AspectRatio ratio={21 / 9} className="bg-muted rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <span className="text-muted-foreground">21:9</span>
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <Footer1 />
    </>
  );
}

