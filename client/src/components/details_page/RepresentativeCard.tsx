"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Users } from "lucide-react";

interface RepresentativeCardProps {
    name: string;
    imageUrl?: string;
    email: string;
    phone: string;
    party: string;
    stance?: "approve" | "against" | "neutral";
}

export default function RepresentativeCard({
    name,
    imageUrl,
    email,
    phone,
    party,
    stance = "neutral",
}: RepresentativeCardProps) {

    const borderColor =
        stance === "approve"
            ? "border-green-600"
            : stance === "against"
                ? "border-[#D5233F]"
                : "border-[#394788]/30";

    const stanceLabel =
        stance === "approve"
            ? "Za"
            : stance === "against"
                ? "Przeciw"
                : "Neutralny";

    const stanceBadgeColor =
        stance === "approve"
            ? "bg-green-600 text-white"
            : stance === "against"
                ? "bg-[#D5233F] text-white"
                : "bg-[#394788] text-white";

    return (
        <Card
            className={`w-full bg-white hover:shadow-lg transition-shadow duration-200 rounded-xl p-5 border-2 ${borderColor}`}
        >
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={imageUrl} alt={name} />
                    <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <h2 className="text-lg font-bold leading-tight">{name}</h2>
                    <Badge className="w-fit mt-1">{party}</Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">

                <div className="flex items-center gap-2">
                    <span
                        className={`text-white px-3 py-1 rounded-full text-xs font-medium ${stanceBadgeColor}`}
                    >
                        {stanceLabel}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Reprezentuje: {party}</span>
                </div>
            </CardContent>
        </Card>
    );
}
