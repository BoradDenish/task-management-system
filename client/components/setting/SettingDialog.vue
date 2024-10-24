<script>
import { SwatchBook, KeyRound, BellRing, LogOut, SquareAsterisk, Accessibility, Hourglass, GlobeLock, Braces, Code } from 'lucide-vue-next';

export default {
    components: { SwatchBook, KeyRound, BellRing, LogOut, SquareAsterisk, Accessibility, Hourglass, GlobeLock, Braces, Code },
    data() {
        return {
            settingList: [
                {
                    id: "#theme",
                    name: "Theme",
                    icon: SwatchBook,
                    category: "General",
                },
                {
                    id: "#shortCut",
                    name: "Short Cut",
                    icon: Code,
                    category: "General",
                },
                {
                    id: "#notifications",
                    name: "Notifications",
                    icon: BellRing,
                    category: "General",
                },
                {
                    id: "#timeZones",
                    name: "Time Zones",
                    icon: Hourglass,
                    category: "General",
                },
                {
                    id: "#accessibility",
                    name: "Accessibility",
                    icon: Accessibility,
                    category: "General",
                },
                {
                    id: "#loginOptions",
                    name: "Login Options",
                    icon: KeyRound,
                    category: "Security",
                },
                {
                    id: "#passwordSecurity",
                    name: "Password & Security",
                    icon: SquareAsterisk,
                    category: "Security",
                },
                {
                    id: "#privacyControl",
                    name: "Privacy Control",
                    icon: GlobeLock,
                    category: "Privacy",
                },
                {
                    id: "#sessions",
                    name: "Sessions",
                    icon: Braces,
                    category: "Account",
                },
                {
                    id: "#logout",
                    name: "Log Out",
                    icon: LogOut,
                    category: "Account",
                    text: "#ff0000"
                }
            ],
            activeTab: ""
        }
    },
    created() {
        this.activeTab = this.settingList[0].id
    }
}
</script>

<template>
    <Dialog :open="true">
        <DialogTrigger as-child>
            <Button variant="outline">
                Edit Profile
            </Button>
        </DialogTrigger>
        <DialogScrollContent class="max-w-4xl flex max-h-[80dvh] p-0  items-stretch overflow-hidden">
            <ScrollArea class="h-full w-full max-w-[260px]">
                <aside class="w-full h-full  bg-opacity-10 pt-5 pb-12 px-4 border-r border-border space-y-8">
                    <h4 class="text-2xl tracking-wide ml-2">Settings</h4>
                    <ul class="space-y-2">
                        <li v-for="item in settingList" :key="item.id">
                            <Button class="w-full justify-between" :class="item.text ? `text-[${item.text}]` : ''"
                                :variant="item.id === activeTab ? 'secondary' : 'ghost'"
                                @click="this.activeTab = item.id">
                                <div class="flex items-center gap-3">
                                    <component :is="item.icon" class="w-4 h-4" />
                                    {{ item.name }}
                                </div>
                            </Button>
                        </li>
                    </ul>
                </aside>
            </ScrollArea>
            <ScrollArea class="w-full h-full">
                <div class="py-6 px-4">
                    <div v-if="activeTab === '#theme'" >
                        <SettingThemeTab />
                    </div>
                    <div v-if="activeTab === '#shortCut'">
                        <SettingShortKeyTab />
                    </div>
                </div>
            </ScrollArea>
        </DialogScrollContent>
    </Dialog>
</template>