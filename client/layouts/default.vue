<script setup>
import { House } from 'lucide-vue-next';
</script>

<template>
  <main>
    <header>
      <div class="divide-x divide-solid divide-border flex items-center gap-4">
        <CustomLogo :size="7" />
        <div class="px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as="RouterLink" to="/">
                  <House size="16" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div></div>
      <div class="flex items-center gap-2">
        <Sheet>
          <SheetTrigger class="max-h-8">
            <Avatar class="max-w-8 max-h-8">
              <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>

          </SheetContent>
        </Sheet>
      </div>
    </header>
    <div class="main-content">
      <ScrollArea as="aside">
        <div class="divide-y divide-border w-full">
          <CustomSideBar />
        </div>
      </ScrollArea>
      <ScrollArea class="w-full h-full">
        <div class="w-full max-w-6xl mx-auto p-2">
          <slot />
        </div>
      </ScrollArea>
    </div>
  </main>
</template>

<style scoped>
main {
  @apply w-full flex flex-col h-dvh overflow-hidden bg-muted
}

main header {
  @apply w-full bg-background border-b border-solid border-border py-1.5 px-2.5 flex items-center justify-between
}

.main-content {
  @apply w-full h-full flex
}

aside {
  @apply bg-background border-r border-solid border-border h-full w-full max-w-64 overflow-y-auto
}
</style>